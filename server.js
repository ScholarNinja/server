var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: 9000, path: '/', allow_discovery: true});

server.on('connection', function(id) {
  console.log('Connected: ' + id );
});

server.on('disconnect', function(id) {
  console.log('Disconnected: ' + id );
});
