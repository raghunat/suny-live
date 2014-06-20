var Message = require('./messageSchema').Message;

exports.createMessage = function(message, user_from, user_to, pub, chatRoom, callback){
	var newMessage = new Message();
  newMessage.message = message;
	newMessage.user_from = user_from;
	if (pub === true){
		newMessage.user_to = "Public";
	}else{
		newMessage.user_to = user_to;
	}
	newMessage.pub = pub;
	newMessage.chatRoom = chatRoom._id; 
	newMessage.date = Date.now();

	newMessage.save(function(err, result){
		if(err){
			throw err;
		}
		callback(result);
	});
}

exports.getMessagesByUser = function(user, callback){
	Message.find({user_from : user}, function(err, result){
		if(err){
			throw err;
		}
		callback(result);
	});
};

exports.getMessagesByChatRoom = function(chatRoom, callback){
	Message.find({chatRoom : chatRoom}, function(err, result){
		if(err){
			throw err;
		}
		callback(result);
	});
};

exports.getMessageByDate = function(date, callback){

	Message.find({date : {$gte : date}}, function(err, result){
		if(err){
			throw err;
		}
		callback(result);
	});
};

exports.getMessageRangeDate = function(from_date, to_date, callback){
	Message.find({date : {$gte : from_date}, date : {$lte : to_date}}, function(err, result){
		if(err){
			throw err;
		}
		callback(result);
	});
};
