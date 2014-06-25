var mongoose = require('mongoose');
var encrypt = require('../encrypt');

//TODO remove after debug
mongoose.set("debug", true);


//user Schema
var userSchema = mongoose.Schema({
    name : String,
    email  : String,
    userName : String,
    password : String,
    IP : String,
    //type of user. It can be a user admin 0, user student 1, user presentor (professor) 2, (user guest 3) ?.
    type : Number
});

//instance of my schema
var User = mongoose.model('User', userSchema);

//export of my schema
module.exports = {
    User : User
};