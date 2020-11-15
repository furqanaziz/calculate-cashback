const express = require('express');
const path = require('path');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('./middlewares/logger'));
app.use(require('./middlewares/body-parser'));
app.use(require('./middlewares/cookie-parser'));

// Routes
app.use('/', require('./routes/index'));

// Middlewares
app.use(require('./middlewares/catch-404'));
app.use(require('./middlewares/error-handler'));

module.exports = app;
