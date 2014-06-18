// var clipB = require("copy-paste");

var async = require('async');

var fs = require('fs');

var cp = require('child_process'),
	spawn = cp.spawn,
	grep = spawn('grep', ['ssh']),

	exec = cp.exec,
	child;

var count = 0;
console.log("PID: " + grep.pid);

var data;

var args = [];
args = process.argv.slice(2);

var read = function(path){
	child = exec(path + " " + count/*screenshot path*/, function(){
		console.log("count: " + count);
			fs.readFile(count + ".jpg", function(err, content){
				if(err){
					throw err;
				}
				data = content;
				console.log(data);
				module.exports = data;

				fs.unlink(count + ".jpg", function(err) {
		 			if (err) {
		 				throw err;
		 			}
		 			console.log("File deleted successfully!");
		 			count++;
 				});
			});
	});
}

	read(args[0]);
	grep.stdin.end();



// grep.on('close', function(){
// 	console.log(data);
// 	module.exports = data;
// });

// var args = [];
// args = process.argv.slice(2);

// var print = read(args[0], args[1]);

// grep.stdin.end();

// grep.on('close', function(){

// 	fs.readFile(fileName, function(err, content) {
// 		if (err){
// 			throw err;
// 		}

// 		//read the file with node with fs, store the content
// 		data = content;
// 		console.log("File Data: " + data);//It prints indefined

// 		fs.unlink(fileName, function(err) {
// 			if (err) {
// 				throw err;
// 			}
// 			console.log("File deleted successfully!")
// 		});
// 		print.fileData = data;
// 		ok1 = true;
// 	});

// });


// var read = function(fileName, path){

// 	console.log("path: " + path);

// 	var print = {
// 		fileData: "",
// 		out: "",
// 		screenS: ""
// 	}

// 	var data,
// 		ok1 = false,
// 		ok2 = false;

// 	var clipData;
// 	var screenshot;

// 	async.parallel([

// 		child = exec(path/*screenshot path*/, function(){});

// 		fs.readFile(fileName, function(err, content) {
// 			if (err){
// 				throw err;
// 			}

// 			//read the file with node with fs, store the content
// 			data = content;
// 			console.log("File Data: " + data);//It prints indefined

// 			fs.unlink(fileName, function(err) {
// 				if (err) {
// 					throw err;
// 				}
// 				console.log("File deleted successfully!")
// 			});
// 			print.fileData = data;
// 			ok1 = true;
// 		}),	

// 		clipB.paste(function(err, clip){
// 			if (err) {
// 					throw err;
// 			}
// 			print.out = clip;

// 			clipData = clip;
// 			console.log("clipboard data: " + clipData);
			
// 			//get screenshot
// 			child = exec(path/*screenshot path*/, function(){

// 				clipB.paste(function(err, clipbo){



// 					print.screenS = clipbo;
// 					screenshot = clipbo;
// 					console.log("screenshot data " + screenshot);

// 					// clipB.copy(clipData, function(){
// 					// 	console.log("clipboard Restored! ('" + clipData + "')");
// 					// });
// 					if (screenshot) {
// 						console.log("there is something there");
// 					} else {
// 						console.log("nope")
// 					}
// 				});
// 			});
// 			ok2 = true;
// 		})

// 	],

// 	function(err, results){
// 		return print;
// 	});

	
// }



//copy the data from the clipboard, save it, copy the image data, return the data, and restore the clipboard