var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');


//Function to encrypt and compare passwords
exports.encrypt = function (value){
	return bcrypt.hashSync(value, bcrypt.genSaltSync(8), null);
};

exports.compare = function (password){
	return bcrypt.compareSync(password, this.local.password);
};


//Functions to encrypt and decrypt messages
exports.encryptNormal = function(value){
	var cipher = crypto.createCipher('aes256', 'normal');
	return cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
};

exports.decryptNormal = function(value){
	var decipher = crypto.createDecipher('aes256', 'normal');
	return (decipher.update(value, 'hex', 'utf8') + decipher.final('utf8'));
};
