var Message = require('./messageSchema').Message;
var encrypt = require("../encrypt");

exports.createMessage = function(message, user_from, user_to, pub, chatRoom, callback){
	var newMessage = new Message();
    //newMessage.message = encrypt.encryptNormal(message);
    newMessage.message = message;
	newMessage.user_from = user_from;
	if (pub === true){
		newMessage.user_to = "Public";
	}else{
		newMessage.user_to = user_to;
	}
	newMessage.pub = pub;
	newMessage.chatRoom = chatRoom._id;
	
	newMessage.save(function(err, result){
		if(err){
			throw err;
		}
        //result.message = encrypt.decryptNormal(result.message);
		callback(result);
	});
};

exports.getMessagesByUser = function(user, callback){
	Message.find({user_from : user}, function(err, result){
		if(err){
			throw err;
		}
		/*for (var i= result.length - 1; i >= 0; i--) {
			result[i].message = encrypt.decryptNormal(result[i].message);
		};*/
		callback(result);
	});
};

exports.getMessagesByChatRoom = function(chatRoom, callback){
	Message.find({chatRoom : chatRoom._id}, function(err, result){
		if(err){
			throw err;
		}
		/*for (var i= result.length - 1; i >= 0; i--) {
			result[i].message = encrypt.decryptNormal(result[i].message);
		};*/
		callback(result);
	});
};

exports.getMessageByDate = function(date, callback){

	Message.find({date : {$gte : date}}, function(err, result){
		if(err){
			throw err;
		}
		/*for (var i= result.length - 1; i >= 0; i--) {
			result[i].message = encrypt.decryptNormal(result[i].message);
		};*/
		callback(result);
	});
};

exports.getMessageRangeDate = function(from_date, to_date, callback){
	Message.find({date : {$gte : from_date}, date : {$lte : to_date}}, function(err, result){
		if(err){
			throw err;
		}
		/*for (var i= result.length - 1; i >= 0; i--) {
			result[i].message = encrypt.decryptNormal(result[i].message);
		};*/
		callback(result);
	});
};
