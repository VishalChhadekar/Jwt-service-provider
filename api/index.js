#!/usr/bin/env node

var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var http = require('http');
var debug = require('debug')('C4CService:server');

// var routes = require('./routes/index');
var users = require('./routes/users');
var errorHandler = require('./middlewares/errorHandler');

var app = express();
var port = normalizePort(process.env.PORT || '5000');
app.set('port', port);

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Static files (if needed)
// app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
// app.use('/', routes);
app.use('/api/users/sts', users);

// Custom error handler
app.use(errorHandler);

// Create HTTP server
var server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// Normalize a port into a number, string, or false
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

// Event listener for HTTP server "error" event
function onError(error) {
    if (error.syscall !== 'listen') throw error;
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
// Event listener for HTTP server "listening" event
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
