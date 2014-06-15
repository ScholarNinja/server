var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: 9000, path: '/', allow_discovery: true});

console.log('Hello');

server.on('connection', function(id) {
  console.log('Connected: ' + id );
});

server.on('disconnect', function(id) {
  console.log('Disconnected: ' + id );
});

// Simple HTTP endpoint for Chord peers
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(Object.keys(server._clients.peerjs)));
}).listen(9001);

