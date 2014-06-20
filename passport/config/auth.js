// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: '706231409413602', // your App ID
		'clientSecret' 	: '3b7d2752358b97f9ef175f04f030df9b', // your App Secret
		'callbackURL' 	: 'http://127.0.0.1:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		: 'uNVugdUjzrRWYM5wxFtVl5sxe',
		'consumerSecret' 	: 'Z6kGUTL7EUy0Vog1vIymj4OmtbaZk6j6LQlLNQ9pWIFDGYBu00',
		'callbackURL' 		: 'http://127.0.0.1:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		: '93686816230-h0slmfbs8a08ueehutbtk3ap89rlqotb.apps.googleusercontent.com',
		'clientSecret' 	: 'DvUR9yYHwq3E0rZC2wMYuzBq',
		'callbackURL' 	: 'http://127.0.0.1:8080/auth/google/callback'
	}

};