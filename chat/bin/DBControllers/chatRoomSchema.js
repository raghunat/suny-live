<<<<<<< HEAD
//chatRoom Schema
var mongoose = require('mongoose');

=======
var mongoose = require('mongoose');
//chatRoom Schema
>>>>>>> origin/UserController
var chatRoomSchema = mongoose.Schema({
	name : String,
	date  : Date,
	presenter : String,
	//type of chatRoom. It can be a public 0 or private 1.
	type : Number,
	className : String,
	school : String,
	files : Array,
	participants : Array
});

	
//instance of the model
var ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);

module.exports = {
	ChatRoom : ChatRoom
}