/**
 * Created by Nemo on 16/3/14.
 */

var dgram = require('dgram');

var server = dgram.createSocket("udp4");
server.on('message', function (message) {
  console.log(message.toString());
});

server.on('listening', function () {
  console.log('listening');
});

server.bind(8125, '127.0.0.1');