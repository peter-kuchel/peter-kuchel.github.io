
// minimal http server just for testing the site out

const http = require('http');
const fs = require('fs');
const { PORT, HOST } = require('./hostconfig');


const handleReqUrl = (url) => {
    return url == '/' ? 'index.html' : url.replace("/", "");
}

const handleContentType = (file) => {
    // deal with file types and parse them correctly to the client 
    // only 4 MIME types being dealt with for now 

    if (file.endsWith(".css"))
        return "text/css";

    else if (file.endsWith(".js"))
        return "text/javascript";

    else if (file.endsWith(".png"))
        return "image/png";

    else if (file.endsWith(".html"))
        return "text/html";

    // default 
    return "text/plain";
}

const handleReq = (req, res) => {

    console.log(`Request received for '${req.url}' from client`);

    let file = handleReqUrl(req.url);
    console.log(`file to search for: ${file}`);

    // __dirname has the absolute path of where the node.js code is running 
    fs.readFile(file, (err, content) => {
        if (err) {

            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 NOT FOUND");

            return;
        }

        res.writeHead(200, { "Content-Type": handleContentType(file) });
        res.end(content);

        console.log(`${file} successfully sent to client`);
    });
}

const server = http.createServer(handleReq);
server.listen(PORT, HOST, () => { console.log(`Running [${HOST}] on PORT ${PORT}`) });