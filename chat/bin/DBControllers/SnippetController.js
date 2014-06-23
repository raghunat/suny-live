var Snippet = require('./snippetSchema').Snippet;

exports.saveSnippet = function(snippetName, text, className, presenter, chatRoom, callback){
	var newSnippet = new Snippet();
	newSnippet.snippetName = snippetName;
  newSnippet.text = text;
	newSnippet.className = className; 
	newSnippet.presenter = presenter;  
	newSnippet.chatRoom = chatRoom._id; 
	newSnippet.date = Date.now(); 
	newSnippet.timeaccessed = 0;

	newSnippet.save(function(err, result){
		if(err){
			throw err;
		}
		callback(result);
	});
}

exports.findOneSnippetByName = function(snippetName, callback){
	Snippet.findOne({snippetName : snippetName}, function(err, result){
		if(err){
			throw err;
		}
		
		Snippet.update({snippetName: result.snippetName}, {$inc : {timeaccessed : 1}}, function(err, result){
			if(err){
				throw err;
			}
			callback(result);
		});
	});
};
