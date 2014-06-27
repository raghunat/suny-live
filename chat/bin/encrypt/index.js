var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var cipher = crypto.createCipher('aes256', 'normal');
var decipher = crypto.createDecipher('aes256', 'normal');

//Function to encrypt and compare passwords
exports.encrypt = function (value){
	return bcrypt.hashSync(value, bcrypt.genSaltSync(8), null);
};

exports.compare = function (password, val){
	return bcrypt.compareSync(password, val);
};


//Functions to encrypt and decrypt messages
exports.encryptNormal = function(value){
	return cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
};

exports.decryptNormal = function(value){
	return (decipher.update(value, 'hex', 'utf8') + decipher.final('utf8'));
};
