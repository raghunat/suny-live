var ChatRoom = require('./chatRoomSchema').ChatRoom;

exports.createChatRoom =  function(name, date, presenter, type, className, school, files, participants, callback){
    this.findChatRoomByName(name, function(result){
        if(result != "ChatRoom not found!"){
            callback("ChatRoom name is already in use. Please, choose another one.");    
        }else{
            var newChat = new ChatRoom();
            newChat.name = name;
            newChat.date = date;
            newChat.presenter = presenter;
            newChat.type = type;
            newChat.className = className;
            newChat.school = school;
            newChat.files = files;
            newChat.participants = participants;
            
            newChat.save(function(err,result){
                if(err){
                    throw err;
                }
                callback("ChatRoom created successfully!");
            });
        }
    });
};


exports.updateChatRoom = function(name, date, presenter, type, className, school, files, participants, callback){
    ChatRoom.findOne({name : name}, function(err,result){
        if(err){
            throw err;
        }
        if(result){
            result.name = name;
            result.date = date;
            result.presenter = presenter;
            result.type = type;
            result.className = className;
            result.school = school;
            result.files = files;
            result.participants = participants;
            result.save(function(err,result){
                if(err){
                    throw err;
                }
                callback("ChatRoom updated successfully!");
            });
        }else{
             callback("ChatRoom not found!");
        }
    });    
};

exports.removeChatRoom = function(name, callback){
     ChatRoom.remove({name : name}, function(err, result){
        if(err){
            throw err;
        }else{
            if(result){
                callback("ChatRoom removed successfully!");
            }else{
                callback("ChatRoom not found!");
            }
        }
    }); 
};

exports.findChatRoomByName = function(name, callback){
     ChatRoom.find({name : name}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result && result.length > 0){
                callback(result);
            }else{
                callback("ChatRoom not found!");
            }
        }
    });
};

exports.findChatRoomBySchool = function(school, callback){
     ChatRoom.find({school : school}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result && result.length > 0){
                callback(result);
            }else{
                callback("ChatRoom not found!");
            }
        }
    });
};

exports.findChatRoomByClassName = function(className, callback){
     ChatRoom.find({className : className}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result && result.length > 0){
                callback(result);
            }else{
                callback("ChatRoom not found!");
            }
        }
    });
};

exports.findChatRoomByType = function(type, callback){
     ChatRoom.find({type : type}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result && result.length > 0){
                callback(result);
            }else{
                callback("ChatRoom not found!");
            }
        }
    });
};

exports.findChatRoomByPresenter = function(presenter, callback){
     ChatRoom.find({presenter : presenter}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result && result.length > 0){
                callback(result);
            }else{
                callback("ChatRoom not found!");
            }
        }
    });
};

exports.findChatRoomByDate = function(date1, date2, callback){
     ChatRoom.find({ date : {$gte : date1} , date : {$lte : date2}}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result && result.length > 0){
                callback(result);
            }else{
                callback("ChatRoom not found!");
            }
        }
    });
};



