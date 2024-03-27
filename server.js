const express = require('express');
const app = express(); 
const http = require('http');
const server = http.createServer(app);
const morgan = require('morgan'); 
const cors = require('cors'); 
const rutasUser = require('./routes/rutaUser');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(cors());
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('Ruta raiz backend')
})

app.get('/login', (req, res) => {
    res.send('Esta es la ruta que usaremos para el login ');
});

app.use((err, req, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

const port = process.env.PORT || 5000;

app.set('port', port);

rutasUser(app);

server.listen(port, function() {
    console.log('Aplicacion Node.js iniciada en el puerto ' + port);
});