var User = require('./userSchema').User;
var encrypt = require("../encrypt");

exports.createUser =  function(name, email, userName, password, IP, type, callback){
    console.log("here");
    var newUser = new User();
    newUser.name = name;
    newUser.email = email;
    newUser.userName = userName;
    newUser.password = encrypt.encrypt(password);
    newUser.IP = IP;
    newUser.type = type;

    newUser.save(function(err,result){
        console.log("there");
        if(err){
            throw err;
        }
        callback(result);
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
            result.password = encrypt.encrypt(password);
            result.IP = IP;
            result.type = type;
            //result.password = generateHash(password); //encrypted password
         
            result.save(function(err,result){
                if(err){
                    throw err;
                }
                callback(result);
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
                callback(result);
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
            if(result){
                callback(result);
            }else{
                callback("User not found!");
            }
        }
    });
};

exports.findUserByName = function(name, callback){
     User.findOne({name : name}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result){
                callback(result);
            }else{
                callback("User not found!");
            }
        }
    });
};

exports.findUserByEmail = function(email, callback){
    User.findOne({'email' : email}, function(err, result){
        console.log(result);
        if(err){
            throw err;
        }else{
            callback(result);
        }
    });
};

exports.findUserByType = function(type, callback){
     User.find({type : type}, function(err,result){
        if(err){
            throw err;
        }else{
            if(result){
                callback(result);
            }else{
                callback("User not found!");
            }
        }
    });
};

exports.Schema = User;




