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

var messageController = require('./bin/DBControllers/MessageController');
var userController = require('./bin/DBControllers/UserController');
var chatController = require('./bin/DBControllers/ChatController');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/chat/:id/:user', function(req, res) {
    
    var currentChatRoom;

    chatController.findChatRoomByName(req.params.id, function(chatRoom){
        currentChatRoom = chatRoom;
        userController.findUserByUserName(req.params.user, function(user){
            console.log(user);
            messageController.getMessagesByChatRoom(chatRoom,function(messages){
                console.log(messages);
                res.render('chat', {chat: chatRoom, messages: messages, user:user});
                io.on('connection', function(socket) {

                    socket.on('join', function(userName, userType) {
                        socket.user = {
                            userName:userName,
                            userType:userType
                        }
                    });

                    socket.on('chat message', function(user, msg){
                        messageController.createMessage(msg,user,user,true,currentChatRoom,function(msg){
                            io.emit('chat message received', msg);
                        });
                    });

                    socket.on("private message", function(user_from, user_to, msg){
                        messageController.createMessage(msg, user_from, user_to, false, currentChatRoom, function(msg){
                            //console.log(io.sockets.sockets);
                            if (socket.user.userType === 1) {
                                //a student can send a private message, but only a teacher sees it.
                                for (var i = 0; i < io.sockets.sockets.length; i++) {
                                    if(io.sockets.sockets[i].user.userType === 2){
                                        io.sockets.sockets[i].emit("private message received", msg.user_from, msg.message);
                                        socket.emit("private message received", msg.user_from, msg.message);
                                        return;
                                    }
                                }
                            } else {
                                //a teacher can send a private message, but only a certain student will see it.
                                for (var j = 0; j < io.sockets.sockets.length; j++) {
                                    if(io.sockets.sockets[j].user.userName == msg.user_to) {
                                        io.sockets.sockets[j].emit("private message received", msg.user_from, msg.message);
                                    }
                                }
                            }
                        });
                    });

                    io.on('snippet',function(){
                        //io.emit();
                    });

                    io.on('screen',function(){
                        //io.emit();
                    });
                });
            });    
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

db.once("open", function(){
    //launch the server
    http.listen(process.argv[2], function(){
        console.log("Chat Instance started at port: " + process.argv[2]);
    });
});

