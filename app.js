const express = require('express');
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();

// view engine setup
app.set('view engine', 'pug');

// middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
const mainRoutes = require('./routes');
const aboutRoutes = require('./routes/about');
const projectRoutes = require('./routes/projects');
app.use(mainRoutes);
app.use('/about', aboutRoutes);
app.use('/project', projectRoutes);

// error handlers
app.use((req, res, next) => {
  console.log('404 error handler called');
  const err = new Error('Oops!  It looks like the page you\'re looking for does not exist.');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err) {
    console.log('Global error handler called', err);
  }
  if (err.status === 404) {
    console.log('404 error handler called');
    res.status(404).render('page-not-found', { err });
  } else {
    err.message = err.message || `Oops! It looks like something went wrong on the server.`;
    res.status(err.status || 500).render('error', { err });
  }
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});

module.exports = app;