var express = require('express');
var cors = require('cors');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var todos = require('./routes/todos');

// inicia o express
var app = express();

// Configura os middlewares do express
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Definição dos arquivos de rotas
app.use('/todos', todos);

// Captura os erros 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Captura exceptions
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  const error = {
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  };

  // render the error page
  res.status(err.status || 500);
  res.json(error);

  console.error(error);
});

module.exports = app;
