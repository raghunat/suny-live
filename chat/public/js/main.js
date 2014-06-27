// Window buttons =======================================
// ======================================================

// Minimize button --------------------------------------
$(".minimize").on("click", function () {

	var panel = $(this).closest(".chat-panel");

	if(panel.hasClass("fullscreen")) smallsize(panel);
	
	togglePanelBody(panel);			
});

// Close button -----------------------------------------
$(".close").on("click", function () {

	var panel = $(this).closest(".chat-panel");

	if(panel.hasClass("fullscreen")) {
		panel.remove();
		$("#chat-wrapper").hide();
	} else {				
		$(this).closest(".chat-col").remove();
	}
});

// Maximize button --------------------------------------
$(".resize").on("click", function () {	
	var panel = $(this).closest(".chat-panel");

	// If fullscreen mode is active, the panel returns to the small size
	if(panel.hasClass("fullscreen")) {
		smallsize(panel);				
	} else {
		$(this).html("&searr;");

		// returns a previous panel to the small size
		var oldPanel = $("#fullscreen").find(".chat-panel");

		if(oldPanel.length) {
			oldPanel.each(function (){
				smallsize(oldPanel);
				togglePanelBody(oldPanel);
			});					
		}
		
		// turn on fullscreen mode
		panel.toggleClass("fullscreen");
		// fullscreen mode
		$("#fullscreen").append(panel);
		$("#chat-wrapper").show();

		$("#chat-row .chat-col").each(function () {
			
			if($(this).find(".chat-panel").length) {
				// minimize all chat panels
				$(this).find(".chat").hide();
				$(this).find(".panel-footer").hide();
			} else {
				// Removes the cols without panel
				$(this).remove();
			}
		});

		scrollDown(panel);
	}

	panel.find(".chat").show();
	panel.find(".panel-footer").show();
});

// Cancel fullscreen ------------------------------------
$("#chat-wrapper-bg").on("click", function(){
	var panel = $("#fullscreen").find(".chat-panel");

	if(panel.length) {
		panel.each(function () {
			smallsize(panel);
		});					
	}
});

// Helpful functions ------------------------------------

function togglePanelBody (panel) {

	panel.find(".chat").toggle();
	panel.find(".panel-footer").toggle();
}

function smallsize (panel) {
	panel
		.removeClass("fullscreen") // turn off fullscreen mode
		.find(".resize").html("&nwarr;");
	
	$("<div>")
		.addClass("col-xs-12 col-sm-6 col-md-4 chat-col")
		.append(panel)
		.appendTo("#chat-row");
	
	$("#chat-wrapper").hide();

	scrollDown(panel);
}


// Socket ===============================================
// ======================================================

var socket = io();

socket.on("connect", function(data){
    socket.emit('join', CURRENT_USER_NAME, USER_TYPE);
});

socket.on("join", function(user){
    // TODO create flash when user joins
});

socket.on("joining", function(name){
    if(name != CURRENT_USER_NAME){
        addUser(user);
    }
});

socket.on("screenshare received", function(data){
    $("#content").css("background", "url(data:image/jpeg;base64,"+data+")");
});

socket.on("chat message received", function(msg){
    
    console.log("received");
    
    printMessage({
        chatBox: "public",
        userFrom: msg.user_from || "Undefined",
        timeStamp: "just now",
        message: msg.message
    });
});

socket.on("private message received", function(msg) {
    // TODO handle presenter UI with multiple private chats based on User Name
    // $("#private").append($("<li>").text(msg.message));
});

socket.on("snippet received", function(snippet){
    addSnippet(snippet);
});

function emitMessage(message, to) {

	if(to == "public") {
		socket.emit("chat message", CURRENT_USER_NAME, message);
	} else {
		// TODO update socket emit to handle which person to send it to: Presenter? Student?
		socket.emit("private message", CURRENT_USER_NAME, to, message);
	}
}

// Messages =============================================
// ======================================================

function printMessage (params) {
	var info = $.extend( {
		chatBox: "",
		avatar: "#CCC",
		userFrom: "",
		timeStamp: "",
		message: "",
	}, params );

	var li = $("li.clone").clone().removeClass("clone");

	li.find(".user").text(info.userFrom);
	li.find(".time").text(info.timeStamp);
	li.find(".message").text(info.message);
	li.find(".avatar").css("background-color", info.avatar);

	li.appendTo("#"+info.chatBox+" .chat ul");
}

// Send Message PRESS ENTER -----------------------------

$(".chat-panel").on("keydown", function (event) {
	
	var message =  $(this).find("textarea").val();
	
	if (event.which == 13 && $.trim(message)) {

		emitMessage(message, $(this).attr("id"));

		$(this).find("textarea").val("");
		scrollDown(this, "slow");
		
		return false;

	} else if (event.which == 13) {		
		return false;
	}
});

// Send Message CLICK BUTTON ----------------------------

$(".send-message").on("click", function (event) {
	
	var panel = $(this).closest(".chat-panel");
	var message =  $(panel).find("textarea").val();
	
	if ($.trim(message)) {

		emitMessage(message, panel.attr("id"));

		panel.find("textarea").val("");
		scrollDown(panel, "slow");
	}
	
	return false;
});

function scrollDown (selector, speed) {

	$(selector).each(function () {
		$(this).find(".chat").animate({ 
			scrollTop: $(this).find(".chat > ul").height()
		}, speed || 0);
	});
}

scrollDown(".chat-panel");


// Add Snippet
function addSnippet(snippet) {
    var snippetHTML = "<a class=\"list-group-item\" href=\"/snippets/" + snippet._id + "\" rel=\"tooltip\" data-placement=\"top\" title=\"Download file\"><span class=\"files\"><img src=\"\/img\/file.png\"> "+snippet.snippetName+"<span class=\"pull-right\">"+snippet.date+"<\/span><\/span>\r\n<\/a>";
    $("#snippets").append(snippetHTML);

}

function addUser(user) {
    var userHTML = "<a class=\"list-group-item\" href=\"#\" rel=\"tooltip\" data-placement=\"top\" title=\"Start a private chat\">\r\n<img src=\"\/img\/avatar.png\">"+user+"<span class=\"glyphicon glyphicon-comment pull-right\"><\/span>\r\n<\/a>";
    $("#users").append(userHTML);
}