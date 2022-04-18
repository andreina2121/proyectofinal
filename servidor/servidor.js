const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyparser = require('body-parser')
var mongoose = require("mongoose")

const {generateMessage, generateLocationMessage} = require('./utils/message')

const publicPath = path.join(__dirname, '../publico'); //configuracion para ir directo a la ruta que queremos, y no tener que salir para volver a entrar
const port = process.env.PORT || 3002;

const app = express();
var server = http.createServer(app);
var io = socketIO(server);

mongoose.connect('mongodb+srv://andreina:Mariposajaslo21@cluster0.sumcv.mongodb.net/database?retryWrites=true&w=majority');
var db = mongoose.connection;


app.use(express.static(publicPath));
app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json())

const messagebird = require('messagebird')('e8B1ZYDiNr8WPfo007kLYj1Mh');

//nombre base de datos
const dbName = 'database';
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://andreina:Mariposajaslo21@cluster0.sumcv.mongodb.net/database?retryWrites=true&w=majority';
const client = new MongoClient(url)



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


app.post('/geoloc', (request, response) => {
	console.log(request.body);
	const data = request.body;
	const timestamp = Date.now();
	data.timestamp = timestamp;
	response.json(data);     



	db.collection('coords').insertOne(data,(err,collection)=> {
		if(err){
			throw err;
		}

		console.log("Insertado");

	}); 

});



/* app.get('/fetch',  function(req, res) {
   
        db.collection('coords').find({}).toArray().then(function(coords) {
            res.status(200).json(coords);
        });
  
}); */


app.post('/sms', (req, res) => {

	var numeroa = req.body.numeroa

	messagebird.messages.create({
		originator: 'Asistencia',
 		recipients : numeroa,
  		body : 'Este es un mensaje'
}, function(err, response ){
  if (err) {
          console.log('ERROR:');
          console.log(err);
  } else {
          console.log('SUCCESS');
          console.log(response);
  }

	})

	res.redirect("/index.html");

});




	


