
// minimal http server just for testing the site out

const http = require('http');
const fs = require('fs');
const { PORT, HOST } = require('./hostconfig');

const handleReqUrl = (url) => {
    let requrl = url;

    // have it send the client the index.html in this case
    // all the link and script requests should work as normal 
    if (requrl == '/') {
        requrl = '/index.html'
        console.log(`Responding with index.html`)
    }

    return requrl;
}

const handleReq = (req, res) => {

    console.log(`Request received for '${req.url}' from client`);

    let file = handleReqUrl(req.url);

    // __dirname has the absolute path of where the node.js code is running 
    fs.readFile(__dirname + file, (err, content) => {
        if (err) {

            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 NOT FOUND");

            return;
        }

        // deal with file types and parse them correctly to the client 
        if (file.endsWith(".css")) {
            res.writeHead(200, { "Content-Type": "text/css" });
        } else if (file.endsWith(".js")) {
            res.writeHead(200, { "Content-Type": "text/javascript" });
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
        }

        res.end(content);

        console.log(`${file} successfully sent to client`);
    });
}

const server = http.createServer(handleReq);
server.listen(PORT, HOST, () => { console.log(`Running [${HOST}] on PORT ${PORT}`) });