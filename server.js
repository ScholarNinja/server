var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: 9000, path: '/', allow_discovery: true});

var log = function() {
  var message = Array.prototype.slice.call(arguments).join(' ');
  console.log(new Date().toISOString(), message);
}

log('Hello. This is Scholar Ninja server.');

server.on('connection', function(id) {
  log('Connected:', id );
  logNumberOfPeers();
});

server.on('disconnect', function(id) {
  log('Disconnected:', id );
  logNumberOfPeers();
});

// Log number of peers
var logNumberOfPeers = function () {
  if (server._clients['peerjs']) {
    var numberOfPeers = Object.keys(server._clients['peerjs']).length
    log('Current number of peers:', numberOfPeers);
  }
};

// Log peer listings
server._app.pre(function(req, res, next) {
  log('IP', req.connection.remoteAddress, 'requested', req.path());
  return next();
});

// Simple HTTP endpoint for Chord peers
// Returns array of peer ids, e.g. ['peer1','peer2']
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json'});
  if(server._clients.peerjs) {
    res.end(JSON.stringify(Object.keys(server._clients.peerjs)));
  } else {
    res.end(JSON.stringify([]));
  }
}).listen(9001);

