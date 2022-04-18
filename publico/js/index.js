	var socket = io(); //metodo de la libreria, sirve para iniciar la solicitud al servidor para abrir la sesion y mantenerla abierta

	socket.on('connect', function() {
		console.log('Conectado');
	});

	socket.on('disconnect', function() {
		console.log('Desconectado');
	});

	socket.on('newMessage', function(message) {
		console.log('newMessage', message);
		var li = jQuery('<li></li>');
		li.text(`${message.from}: ${message.text}`);

		jQuery('#messages').append(li);
	}); //oir un nuevo evento

 

	jQuery('#message-form').on('submit', function (e) {
		e.preventDefault();

		socket.emit('createMessage', {
			from: 'User',
			text: jQuery('[name=message]').val()
		}, function () {

		});
	});