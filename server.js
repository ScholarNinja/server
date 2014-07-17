var PeerServer = require('peer').PeerServer;
var server = new PeerServer({port: 9003, path: '/', allow_discovery: true});

var log = function() {
  var message = Array.prototype.slice.call(arguments).join(' ');
  console.log(new Date().toISOString(), message);
}

// From lodash
function compact(array) {
  var index = -1,
      length = array ? array.length : 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (value && value !== 'undefined') {
      result.push(value);
    }
  }
  return result;
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
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  if(server._clients.peerjs) {
    res.end(JSON.stringify(compact(Object.keys(server._clients.peerjs))));
  } else {
    res.end(JSON.stringify([]));
  }
}).listen(9004);
