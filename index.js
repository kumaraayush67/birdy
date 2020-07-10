var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', (req, res) => {
  	res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
	// socket.join('global');

    socket.on('join', (msg) => {
      	socket.username = msg;
      	io.emit('notify', "USER JOINED " + socket.username);
    });
    
	socket.on('chat message', (msg) => {
		socket.broadcast.emit('chat message', socket.username, msg);
	});

});

http.listen(3000, () => {
  	console.log('listening on *:3000');
});