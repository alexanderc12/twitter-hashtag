var http = require('http');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.configure('views', { autoescape: true, express: app});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(favicon(path.join(__dirname, 'public', 'images', 'icon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

var index = require('./controllers/general');
var auth = require('./controllers/auth');

app.use('/', index);
app.use('/auth', auth);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500 || 400);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

const server_port = 8080;
const server_ip_address = '127.0.0.1';

var server = http.createServer(app);

server.listen(server_port, server_ip_address, function() {
    console.log( "Listening on " + server_ip_address + ":" + server_port );
});
