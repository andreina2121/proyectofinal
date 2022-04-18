const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../publico'); //configuracion para ir directo a la ruta que queremos, y no tener que salir para volver a entrar
const port = process.env.PORT || 3002;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('Nueva conexión');

	socket.emit('newMessage', generateMessage('Asistencia', 'Bienvenido'));

	socket.broadcast.emit('newMessage', generateMessage('Asistencia', 'Conexión abierta'));



/*	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);

		io.emit('newMessage', generateMessage(message.from, message.text)); 
		callback('Esto es del servidor'); 

	});  //listener */


	socket.on('createLocationMessage', (coords) => {
		io.emit('newLocationMessage', generateLocationMessage('Asistencia', coords.latitude, coords.longitude));
	});



	socket.on('disconnect', () => {
		console.log('Cliente desconectado');
	});

});  


 
server.listen(port, () => {
	console.log(`Servidor conectado en ${port}`);
});