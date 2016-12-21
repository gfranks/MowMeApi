var EM = {};
module.exports = EM;

EM.server = require("emailjs/email").server.connect({
	host 	    : process.env.EMAIL_HOST,
	user 	    : process.env.EMAIL_USER,
	password    : process.env.EMAIL_PASS,
	ssl		    : true
});

EM.dispatchResetPasswordLink = function(user, callback) {
	EM.server.send({
		from         : process.env.EMAIL_FROM || 'Mow Me Login <do-not-reply@gmail.com>',
		to           : user.email,
		subject      : 'Password Reset',
		text         : 'something went wrong... :(',
		attachment   : EM.composeEmail(user)
	}, callback );
}

EM.composeEmail = function(user) {
	var link = 'https://mow-me.herokuapp.com/reset-password?email='+email.email+'&password='+user.password;
	var html = "<html><body>";
	if (user.firstName) {
		html += "Hi "+user.firstName+",<br><br>";	
	} else {
		html += "Hi "+user.email+",<br><br>";
	}
	html += "Your email is <b>"+user.email+"</b><br><br>";
	html += "<a href='"+link+"'>Click here to reset your password</a><br><br>";
	html += "Cheers,<br>";
	html += "</body></html>";
	return  [{data:html, alternative:true}];
}