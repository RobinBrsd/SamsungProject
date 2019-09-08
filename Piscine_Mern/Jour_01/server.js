const http = require('http');
const port = 4242;

var route = require('./route');
const server = http.createServer(route.handleRoutes);
server.listen(port);