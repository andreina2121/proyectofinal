const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname, '../publico'); //configuracion para ir directo a la ruta que queremos, y no tener que salir para volver a entrar
const port = process.env.PORT || 3002;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
	console.log('Nueva conexión');

	socket.on('disconnect', () => {
		console.log('Cliente desconectado');
	});
});   //escuchar una conexion
 
server.listen(port, () => {
	console.log(`Servidor conectado en ${port}`);
});