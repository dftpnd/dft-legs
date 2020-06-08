const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort(path, { baudRate: 9600 })






io.on('connection', function(socket){
    console.log('io on connection')

    socket.on('action', function({ M1 }){


    });
  });


app.get('/', function(_, res){
  res.sendFile(__dirname + '/index.html');
});




http.listen(3000, function(){
  console.log('listening on *:3000');
});

