
// minimal http server just for testing the site out

const http = require('http');
const netconfig = require('./netconfig');

const PORT = netconfig.PORT;
const HOST = netconfig.HOST;

const server = http.createServer((req, res) => {
    // find html file to run -- assume index.html


    // console.log(req.headers);
    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write('<h>Hello Cho Cho\n<\h>');
    res.end();

}).listen(PORT, HOST, () => {
    console.log(`Running [${HOST}] on PORT ${PORT}`);
});
