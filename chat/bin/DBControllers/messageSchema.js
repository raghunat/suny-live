var mongoose = require('mongoose');
//message Schema
var messageSchema = mongoose.Schema({
<<<<<<< HEAD
	message : String,  //Message send in the chat
	user_from : String, //Email address of the user sending the message
	user_to : String, //Email address of the user receiving 
	pub : Boolean, //Public(broadcast the message) or Private(send to a determined user)
	chatRoom  : {type: String, ref: 'ChatRoom'}, //ChatRoom link Schema.ObjectId
	date : Date //Message's date time
=======
	message : String,
	user : String,
	chatRoom  : {type: String, ref: 'ChatRoom'},
	date : Date
>>>>>>> origin/UserController
});

//instance of the model
var Message = mongoose.model('Message', messageSchema);

module.exports = {
	Message : Message
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/UserController
