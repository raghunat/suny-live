var express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    app = express(),
    http = require("http").Server(app),
    io = require("socket.io")(http),
    routes = require('./routes');
    mongoose = require("mongoose");

//connect to mongo
mongoose.connect("mongodb://publicUser:publicUser@ds043027.mongolab.com:43027/csit390test");
var db = mongoose.connection;


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/chat/:id', function(req, res) {
    //chat object
    var chat = {
        name: "Test",
        date: "06/12/2014",
        className: "Class Name",
        school: "SUNY Fredonia",
        files: [],
        presenter: {
            type: "Type",
            ref: "Reference"
        },
        participants: {
            type: [],
            ref: []
        }
    };
    chat.id = req.params.chatID;

    //messages objects
    var messages = [
        {
            user: {
                type: "Type",
                ref: "user"
            },
            message: "Hey how is everyone doing",
            date: "06/12/2014",
            chatRoom: {
                type: "Type",
                ref: req.params.chatID
            }
        },
        {
            user: {
                type: "Type",
                ref: "user"
            },
            message: "Hey how is everyone doing",
            date: "06/12/2014",
            chatRoom: {
                type: "Type",
                ref: req.params.chatID
            }
        },
        {
            user: {
                type: "Type",
                ref: "user 2"
            },
            message: "Hey ",
            date: "06/12/2014",
            chatRoom: {
                type: "Type",
                ref: req.params.chatID
            }
        }
    ];

    res.render('chat', {chat: chat, messages: messages});
});

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

//launch the server
http.listen(process.argv[2], function(){
    console.log("Chat Instance started at port: " + process.argv[2]);
});
