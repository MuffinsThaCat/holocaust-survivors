'use strict'
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const ehbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-sessions');
const flash = require('express-flash-messages');

const app = express();
const indexRouter = require('./routes/index');
app.use('/', indexRouter);
app.use(flash());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('partials', path.join(__dirname, 'views/partials'));

app.engine('hbs', ehbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');

app.use(helmet());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;