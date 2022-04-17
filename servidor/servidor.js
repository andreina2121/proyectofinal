const path = require('path');
const express = require('express');


const publicPath = path.join(__dirname, '../publico'); //configuracion para ir directo a la ruta que queremos, y no tener que salir para volver a entrar
const port = process.env.PORT || 3002;

var app = express();

app.use(express.static(publicPath));

app.listen(port, () => {
	console.log(`Servidor conectado en ${port}`);
});