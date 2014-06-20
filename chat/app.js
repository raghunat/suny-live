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

var messageController = require('chat/bin/DBControllers/MessageController');
var userController = require('chat/bin/DBControllers/UserController');
var chatController = require('chat/bin/DBControllers/ChatController');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/chat/:id', function(req, res) {
    

    io.on('connection', function(socket) {

        //function : findChatRoomByName();
        //description: find the chat room by the chat id and returned it;
        chatController.findChatRoomByName(req.params.id, function(chatRoom){
            
            socket.on('join', function(){
                userController.findUserByUserName('test', function(){
                    //get messages from today**
                    messageController.getMessagesByChatRoom(chatRoom,function(messages){
                        res.render('chat', {chat: chatRoom, messages: messages, user:'test'});    
                    });    
                });               
            });

            socket.on('chat message', function(msg){
                messageController.createMessage(msg,'test',chatRoom,function(msg){
                    io.emit('chat message', msg);
                });
            });    

        });


        io.on('snippet',function(){
            io.emit();
        });

        io.on('screen',function(){
            io.emit();
        });

    });

    
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
