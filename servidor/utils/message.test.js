var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
	it('genera un mensaje', () => {

		var from = 'Jen';
		var text = 'Algun mensaje';
		var message = generateMessage(from, text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, text});


	});

});

describe('generateLocationMessage', () => {
		it('genera la ubicación', () => {

		var from = 'Deb';
		var latitude = 49;
		var longitude = 34;
		var url = 'https://www.google.com/maps?q=49,34';
		var message = generateLocationMessage(from,latitude,longitude);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from, url});


	});

})