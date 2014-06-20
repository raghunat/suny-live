var mongoose = require('mongoose');
var messageController = require('./MessageController');
var Message = require('./messageSchema').Message;


mongoose.connect("mongodb://publicUser:publicUser@ds043027.mongolab.com:43027/csit390test");


var db = mongoose.connection;
db.once("open", function(){
	messageController.createMessage("Heyyy", "Jessiel", "Gustavo", false, "chatRoom", function(result){
		console.log(result);
	});

	/*messageController.getMessagesByUser("Me", function(result){
		console.log(result);
	});*/
/*	var today = new Date();
	var date = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes()-20);
	var date_to = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes()-16);
	messageController.getMessageRangeDate(date, date_to, function(result){
		console.log(result);
	});
*/
});