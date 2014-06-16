var mongoose = require('mongoose');
//message Schema
var messageSchema = mongoose.Schema({
	message : String,
	user : String,
	chatRoom  : {type: String, ref: 'ChatRoom'},
	date : Date
});

//instance of the model
var Message = mongoose.model('Message', messageSchema);

module.exports = {
	Message : Message
}
