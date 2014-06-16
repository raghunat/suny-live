var User = require('./models/userSchema').User;

exports.createUser =  function(name, email, password, IP, type){
    var result = findUserByUserName(name);    
    if(result){
        console.log("Username is already in use. Please, type another one.");    
    }else{
        var newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.password = password;
        newUser.IP = IP;
        newUser.type = type; 
        newUser.save('saveUser', function(err,result){
        if(err){
            throw err;
        }
        console.log("User created successfully!");
        });
    }
};

exports.updateUser = function(userName){
     User.findOne({userName : userName}, function(err,result){
        if(err){
            throw err;
        }
        if(result){
            result.name = user.name;
            result.email = user.email;
            result.IP = user.IP;
            result.type = user.type;
            result.password = user.generateHash(user.password); //encrypted password
            result.save();
            console.log("User updated successfully!");
        }else{
            console.log("User not found!");
        }
    });    
};

exports.removeUser = function(userName){
     User.remove({userName : userName}, function(err, result){
        if(err){
            throw err;
        }
        if(result){
            console.log("User removed successfully!");
        }else{
            console.log("User not found!");
        }
    }); 
};

exports.findUserByUserName = function(userName){
     User.findOne({userName : userName}, function(err,result){
        if(err){
            throw err;
        }
        return result;
    });
};

exports.findUserByName = function(name){
     User.findOne({name : name}, function(err,result){
        if(err){
            throw err;
        }
        return result;
    });
};

exports.findUserByEmail = function(email){
     User.findOne({email : email}, function(err,result){
        if(err){
            throw err;
        }
        return result;
    });
};

exports.findUserByType = function(type){
     User.findOne({type : type}, function(err,result){
        if(err){
            throw err;
        }
        return result;
    });
};




