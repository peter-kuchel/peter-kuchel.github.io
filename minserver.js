
// minimal http server just for testing the site out

const http = require('http');
const { PORT, HOST } = require('./netconfig');

const server = http.createServer((req, res) => {
    // find html file to run -- assume index.html


    res.writeHead(200, { 'Content-Type': 'text/html' });

    res.write('<h>Hello Cho Cho\n<\h>');
    res.end();

}).listen(PORT, HOST, () => {
    console.log(`Running [${HOST}] on PORT ${PORT}`);
});
