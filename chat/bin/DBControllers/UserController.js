var User = require('./userSchema').User;

exports.createUser =  function(name, email, userName, password, IP, type, callback){
    this.findUserByEmail(email, function(result){
        if(result != "User not found!"){
            callback("Email is already in use. Please, choose another one.");    
        }else{
            var newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.userName = userName;
            newUser.password = password;
            newUser.IP = IP;
            newUser.type = type; 
            
            newUser.save(function(err,result){
                if(err){
                    throw err;
                }
                callback("User created successfully!");
            });    
        }
    }); 
};

exports.updateUser = function(name, email, userName, password, IP, type, callback){
     User.findOne({email : email}, function(err,result){
        if(err){
            throw err;
        }
        if(result){
            result.name = name;
            result.email = email;
            result.userName = userName;
            result.password = password;
            result.IP = IP;
            result.type = type;
            //result.password = generateHash(password); //encrypted password
         
            result.save(function(err,result){
                if(err){
                    throw err;
                }
                callback("User updated successfully!");      
            });
        }else{
             callback("User not found!");
        }
    });    
};

exports.removeUser = function(email, callback){
     User.remove({email : email}, function(err, result){
        if(err){
            throw err;
        }else{
            if(result){
                callback("User removed successfully!");
            }else{
                callback("User not found!");
            }
        }
    }); 
};

exports.findUserByUserName = function(userName, callback){
     User.find({userName : userName}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result && result.length > 0){
                callback(result);
            }else{
                callback("User not found!");
            }
        }
    });
};

exports.findUserByName = function(name, callback){
     User.find({name : name}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result && result.length > 0){
                callback(result);
            }else{
                callback("User not found!");
            }
        }
    });
};

exports.findUserByEmail = function(email, callback){
     User.find({email : email}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result && result.length > 0){
                callback(result);
            }else{
                callback("User not found!");
            }
        }
    });
};

exports.findUserByType = function(type, callback){
     User.find({type : type}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result && result.length > 0){
                callback(result);
            }else{
                callback("User not found!");
            }
        }
    });
};




