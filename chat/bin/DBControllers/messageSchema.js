var mongoose = require('mongoose');
//message Schema
var messageSchema = mongoose.Schema({

	message : {type: String, required: true},  //Message send in the chat
	user_from : {type: String, required: true}, //Email address of the user sending the message
	user_to : {type: String, required: true}, //Email address of the user receiving 
	pub : {type: Boolean, required: true}, //Public(broadcast the message) or Private(send to a determined user)
	chatRoom  : {type: String, ref: 'ChatRoom', required: true}, //ChatRoom link 
	date : {type: Date, default: Date.now, required: true}  //Message's date time
});

//instance of the model
var Message = mongoose.model('Message', messageSchema);

module.exports = {
	Message : Message
};

