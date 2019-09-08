const http = require('http');
const port = 4242;

var moduleWac = require('./moduleWac');

const server = http.createServer(moduleWac.displayVersion);
//const server = http.createServer(moduleWac.displayHello);
//const server = http.createServer(moduleWac.createDirectory('helloDirectory'));
//const server = http.createServer(moduleWac.createFile('helloFiles'));
//const server = http.createServer(moduleWac.deleteDirectory('helloDirectory'));
//const server = http.createServer(moduleWac.deleteFile('helloFiles'));

server.listen(port);