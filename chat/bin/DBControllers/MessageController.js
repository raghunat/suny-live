var Message = require('./messageSchema').Message;

exports.createMessage = function(message, userName, chatRoom){
	var newMessage = new Message();
  newMessage.message = message;
	newMessage.user = userName;
	newMessage.chatRoom = chatRoom._id; 
	newMessage.date = Date.now();

	message.save('save', function(err, result){
		if(err){
			throw err;
		}
	}
}

exports.getMessagesByUser = function(user){
	Message.find({user : user}, function(err, result){
		if(err){
			throw err;
		}
		return result;
	});
};

exports.getMessagesByChatRoom = function(chatRoom){
	Message.find({chatRoom : chatRoom}, function(err, result){
		if(err){
			throw err;
		}
		return result;
	});
};

exporst.getMessageByDate = function(date){
	Message.find({date : date), function(err, result){
		if(err){
			throw err;
		}
	});
};

exporst.getMessageRangeDate = function(from_date, to_date){
	Message.find({date : {$gte : from_date}, date : {$lte : to_date}), function(err, result){
		if(err){
			throw err;
		}
	});
};
