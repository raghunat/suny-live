var mongoose = require('mongoose');
//message Schema
var snippetSchema = mongoose.Schema({
	text : String,  
	className : String, 
	presenter : String,  
	chatRoom  : {type: Schema.ObjectId, ref: 'ChatRoom'}, 
	date : Date 
	timeaccessed : Number
});

//instance of the model
var Snippet = mongoose.model('Message', snippetSchema);

module.exports = {
	Snippet : Snippet
}
