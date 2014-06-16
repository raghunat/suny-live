var ChatRoom = require('./models/chatRoomSchema').User;

exports.createChatRoom =  function(name, date, presenter, type, className, school, files, participants){
    var newChat = new ChatRoom();
    newChat.name = name;
    newChat.date = date;
    newChat.presenter = presenter;
    newChat.type = type;
    newChat.className = className;
    newChat.school = school;
    newChat.files = files;
    newChat.participants = participants;
    
    newChat.save('save', function(err,result){
        if(err){
            throw err;
        }
        console.log("ChatRoom created successfully!");
    });
};


exports.updateChatRoom = function(chatRoom){
     ChatRoom.findOne({name : chatRoom}, function(err,result){
        if(err){
            throw err;
        }
        if(result){
            result.type = chatRoom.name;
            result.className = chatRoom.className;
            result.school = chatRoom.school;
            result.save();
            console.log("ChatRoom updated successfully!");
        }else{
             console.log("ChatRoom not found!");
        }
    });    
};

exports.removeUser = function(name){
     ChatRoom.remove({name : name}, function(err){
        if(err){
            throw err;
        }
        if(result){
            console.log("ChatRoom removed successfully!");
        }else{
            console.log("ChatRoom not found!");
        }
    }); 
};

exports.findChatRoomByName = function(name){
     ChatRoom.findOne({name : name}, function(err,result){
        if(err){
            throw err;
        }
        return result;
    });
};

exports.findChatRoomBySchool = function(school){
     ChatRoom.findOne({school : school}, function(err,result){
        if(err){
            throw err;
        }
        return result;
    });
};

exports.findChatRoomByClassName = function(className){
     ChatRoom.findOne({className : className}, function(err,result){
        if(err){
            throw err;
        }
        return result;
    });
};

exports.findChatRoomByType = function(type){
     ChatRoom.findOne({type : type}, function(err,result){
        if(err){
            throw err;
        }
        return result;
    });
};

exports.findChatRoomByPresenter = function(presenter){
     ChatRoom.findOne({presenter : presenter}, function(err,result){
        if(err){
            throw err;
        }
        return result;
    });
};

exports.findChatRoomByDate = function(date1, date2){
     ChatRoom.find({ date : {$gte : date1} , date : {$lte : date2}}, function(err,result){
        if(err){
            throw err;
        }
        return result;
    });
};



