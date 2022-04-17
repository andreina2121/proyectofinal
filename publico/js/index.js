	var socket = io(); //metodo de la libreria, sirve para iniciar la solicitud al servidor para abrir la sesion y mantenerla abierta

	socket.on('connect', function() {
		console.log('Conectado');

		socket.emit('createMessage', {
			from: 'Andrew',
			text: 'Nice'
		}); //enviar al servidor
	});

	socket.on('disconnect', function() {
		console.log('Desconectado');
	});

	socket.on('newMessage', function(message) {
		console.log('newMessage', message);
	}); //oir un nuevo evento