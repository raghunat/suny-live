var app = require('express')();//express();
var http = require('http').Server(app);//http.Server(serverVar);
var io = require('socket.io')(http);//binds socket.io to http server instance we have
var async = require('async');
var fs = require('fs');

// var Screen = require('./screenshot.js');
var count = 0,
	count2 = 0;

//================= VARIBLES USED IN THE FUNCTION ===============================
var cp = require('child_process'),
	spawn = cp.spawn,
	grep = spawn('grep', ['ssh']),
	exec = cp.exec,
	child;

var /*count = 0,*/
	data,
	args = [];
//=================READING IMAGE TO A BUFFER FUNCTION =================================
var read = function(count){//(path){
	child = exec(/*__dirname + path*/"sstool" + " " + count/*screenshot path*/, function(){
		console.log("count: " + count);
		fs.readFile(/*__dirname + path*/count + ".jpg", function(err, content){
			if(err){
				throw err;
			}
			data = new Buffer(content).toString('base64');
			
		});
	});

	return data;
}

//=============DELETING IMAGE FILE FUNCTION ===============================================
var erase = function(count){
	fs.unlink(/*__dirname + path*/count + ".jpg", function(err) {
		if (err) {
			throw err;
		}
		console.log("File deleted successfully!");
		count++;
	});
}

//================================================================
var img;

var setTime = function(){
	var timer = setInterval(function(){
		// console.log(read(count));
		img = read(count);
		io.emit("screenshot", img);
		// console.log("img: " + img + "  img ending");
		// res.render("student", {img: "data:image/jpg;base64," + img});
		count++;
		if(count === 10) {
			var timer2 = setInterval(function(){
				erase(count2++);
			}, 500);
			console.log("Starting Deleting")
		}
	}, 500);
}


module.exports = setTime;
// module.exports = img;