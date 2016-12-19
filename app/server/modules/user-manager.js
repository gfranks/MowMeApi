var crypto = require('crypto');
User = require("../models/user.js");
var UM = {};
module.exports = UM;

UM.login = function(email, password, callback) {
	User.findOne({email: email}, function (err, user) {
        if (user) {
        	validatePassword(password, user.password, function(err, valid) {
				if (valid) {
					callback(null, user);
				} else {
					callback('Invalid Password', null);
				}
			});
		} else {
			callback('User not found', null);
		}
    });
}

UM.createUser = function(sessionId, newData, callback) {
	var u = new User(newData);
	User.findOne({email: u.email}, function (err, user) {
       if (user) {
			callback('Email Taken', null);
		} else {
			saltAndHash(u.password, function(hash) {
				u.id = sessionId;
				u.password = hash;
				User.create(u, function(err, createdUser) {
					if (err) {
						callback("Unable to create user", null);
					} else {
						callback(null, createdUser)
					}
				});
			});
		}
    });
}

UM.updateUser = function(userId, newData, callback) {
	User.findOneAndUpdate({id: userId}, { $set: newData }, {new: true}, function(err, user) {
		if (err) {
			callback('User not found', null);
		} else {
			callback(null, user);
		}
	});
}

UM.updatePassword = function(userId, newPass, callback) {
	saltAndHash(newPass, function(hash) {
		User.findOneAndUpdate({id: userId}, { $set: {password: hash} }, function(err, user) {
			if (err) {
				callback('Unable to update user password', null);
			} else {
				callback(null, user);
			}
		});
	});
	// User.findOne({id: userId}, function(e, user) {
	// 	if (e) {
	// 		callback('User does not exist', null);
	// 	} else {
	// 		saltAndHash(newPass, function(hash) {
	// 	        user.password = hash;
	// 	        user.save(function(err) {
	// 				if (err) {
	// 					callback('Unable to update user password', null);
	// 				} else {
	// 					callback(null, user);
	// 				}
	// 			});
	// 		});
	// 	}
	// });
}

UM.deleteUser = function(userId, callback) {
	User.user({id: userId}, function(err, user) {
		if (user) {
			callback(null, 'User deleted successfully');
		} else {
			callback('Unable to delete user', null);
		}
	});
}

UM.getUserById = function(userId, callback) {
	User.findOne({id: userId}, function(err, user) {
		if (user) {
			callback(null, user);
		} else {
			callback('Unable to find user', null);
		}
	});
}

UM.validateResetLink = function(email, password, callback) {
	saltAndHash(password, function(hash) {
		o.password = hash;
        User.find({ $and: [{email: email, password: hash}] }, function(err, user) {
			if (user) {
				callback('ok');
			} else {
				callback('Unable to validate reset link');
			}
		});
	});
}

UM.getAllRecords = function(callback) {
	User.find({}, function(err, users) {
		if (users) {
			callback(null, users);
		} else {
			callback('Unable to get users', null);
		}
	});
}

var generateSalt = function() {
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(password, callback) {
	var salt = generateSalt();
	callback(salt + md5(password + salt));
}

var validatePassword = function(plainPass, hashedPass, callback) {
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

var getObjectId = function(id) {
	return new require('mongodb').ObjectID(id);
}