var app = require('express')(); 
var http = require('http').Server(app); 
var io = require('socket.io')(http); 
var mongoose = require('mongoose');

//mongoose.connect("mongodb://publicUser:publicUser@ds043027.mongolab.com:43027/csit390tes");

app.get('/snippets/:snippetID', function(req, res) {
	//snippet.find(req.params.id, function(result){
		fs.writeFile(req.params.id + "msg.txt", "hello", function(err){
			if (err){
				throw err;
			}
			res.sendfile(req.params.id + "msg.txt");
			fs.unlink(req.params.id + "msg.txt", function(){
				return;
			});
		});
//	});
	
});

app.post('/snippets', function(req, res) {
	snippet.save(req.body.code, function(result){
		io.emit("snippet", function(result){

		});
	});
  res.send('/ ');
});

app.listen(8000);



