var mongoose = require("mongoose");
var UserController = require("./UserController");
mongoose.connect("mongodb://publicUser:publicUser@ds043027.mongolab.com:43027/csit390test");
var db = mongoose.connection;
//name, email, password, IP, type
db.once('open', function(){
	// UserController.findUserByName("Gustavo", function(result){
	// 	console.log(result);
	// });
	
});
// UserController.updateUser("gustavo","gfsgus37sf6@gmail.com","gustavo","password","192.168.1.120",0, function(result){
// 		console.log(result);
// 	});

// UserController.createUser("gustavo","1@gmail.com","gustavo","password","192.168.1.120",0, function(result){
// 		console.log(result);
// 	})

// UserController.createUser("gustavo","2@gmail.com","gustavo","password","192.168.1.120",0, function(result){
// 		console.log(result);
// 	})

// UserController.createUser("gustavo","3@gmail.com","gustavo","password","192.168.1.120",0, function(result){
// 		console.log(result);
// 	})

// UserController.createUser("gustavo","4@gmail.com","gustavo","password","192.168.1.120",0, function(result){
// 		console.log(result);
// 	})

// UserController.createUser("gustavo","5@gmail.com","gustavo","password","192.168.1.120",0, function(result){
// 		console.log(result);
// 	})

// UserController.createUser("gustavo","6@gmail.com","gustavo","password","192.168.1.120",0, function(result){
// 		console.log(result);
// 	})


// UserController.removeUser("123@gmail.com", function(result){
// 	console.log(result);
// });


UserController.findUserByUserName("gusta123vo", function(result){
	console.log(result);
});