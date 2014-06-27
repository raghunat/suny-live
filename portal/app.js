var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var routes = require('./routes/index');
var flash = require('connect-flash');
var session = require('express-session');

var app = express();

//connect to mongo
mongoose.connect("mongodb://publicUser:publicUser@ds043027.mongolab.com:43027/csit390test");
var db = mongoose.connection;
mongoose.connection.on('error', function(err) {
    console.error('MongoDB error: %s', err);
});
require('./bin/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//CORS middleware Delete when not localhost!
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});


app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: "replacewithsecretkey"}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes')(app, passport); // load our routes and pass in our app and fully configured passport

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

db.once("open", function(){
    app.listen(8080, function(){
        console.log("Portal Server is running on Port 8080");
    });
});

