var async = require('async');
var fs = require('fs');
var cp = require('child_process'),
	spawn = cp.spawn,
	grep = spawn('grep', ['ssh']),
	exec = cp.exec,
	child;

var count = 0,
	data,
	args = [];

// args = process.argv.slice(2);

var read = function(){//(path){
	child = exec(/*__dirname + path*/"sstool" + " " + count/*screenshot path*/, function(){
		console.log("count: " + count);
			fs.readFile(/*__dirname + path*/count + ".jpg", function(err, content){
				if(err){
					throw err;
				}
				data = content;
				console.log(data);
				module.exports = data;

				fs.unlink(/*__dirname + path*/count + ".jpg", function(err) {
		 			if (err) {
		 				throw err;
		 			}
		 			console.log("File deleted successfully!");
		 			count++;
 				});
			});
	});
}

read(/*args[0]*/);
grep.stdin.end();