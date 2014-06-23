var mongoose = require('mongoose');

//snippetSchema
var snippetSchema = mongoose.Schema({
	snippetName : String,
	text : String,  
	className : String, 
	presenter : String,  
	chatRoom  : {type: String, ref: 'ChatRoom'}, 
	date : {type: Date, default: Date.now},
	timeaccessed : Number
});

//instance of the model
var Snippet = mongoose.model('Snippet', snippetSchema);

module.exports = {
	Snippet : Snippet
};
