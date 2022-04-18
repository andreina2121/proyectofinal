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

	socket.on('newLocationMessage', function (message) {
		var li = jQuery('<li></li>');
		var a = jQuery('<a target="_blank">Ubicación</a>');

		li.text(`${message.from}: `);
		a.attr('href', message.url);
		li.append(a);
		jQuery('#messages').append(li);
	});

 

	jQuery('#message-form').on('submit', function (e) {
		e.preventDefault();

		socket.emit('createMessage', {
			from: 'User',
			text: jQuery('[name=message]').val()
		}, function () {

		});
	});

	var botonUbicacion = jQuery('#enviar-ubicacion');
	botonUbicacion.on('click', function () {
		if(!navigator.geolocation) {
			return alert('Geolocalización no disponible');
		}


		navigator.geolocation.getCurrentPosition(function (position) {

			socket.emit('createLocationMessage', {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			});

		}, function () {

			alert('Geolocalización denegada');
		});

	});
