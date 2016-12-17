
var AM = require('./modules/account-manager');
var EM = require('./modules/email-dispatcher');
var SM = require('./modules/service-manager');

module.exports = function(router) {
	
	/**
     * *****
     * LOGIN
     * *****
     */
	router.post('/login', function(req, res) {
		AM.manualLogin(req.body['email'], req.body['pass'], function(e, o) {
			if (!o) {
				res.status(400).send(e);
			} else {
				res.status(200).send(o);
			}
		});
	});

	router.post('/logout', function(req, res) {
		req.session.destroy(function(e){ res.status(200).send('ok'); });
	})

	/**
     * *******
     * SIGN-UP
     * *******
     */
	router.post('/signup', function(req, res) {
		AM.addNewAccount({
			email 	: req.body['email'],
			pass	: req.body['pass'],
		}, function(e) {
			if (e) {
				res.status(400).send(e);
			} else {
				res.status(200).send('ok');
			}
		});
	});

	/**
     * **************
     * PASSWORD RESET
     * **************
     */
	router.post('/lost-password', function(req, res) {
		// look up the user's account via their email //
		AM.getAccountByEmail(req.body['email'], function(o) {
			if (o) {
				EM.dispatchResetPasswordLink(o, function(e, m) {
					// this callback takes a moment to return //
					// TODO add an ajax loader to give user feedback //
					if (!e) {
						res.status(200).send('ok');
					} else {
						for (k in e) console.log('ERROR : ', k, e[k]);
						res.status(400).send('Unable to dispatch password reset');
					}
				});
			} else {
				res.status(400).send('Email not found');
			}
		});
	});

	router.get('/reset-password', function(req, res) {
		var email = req.query["email"];
		var passH = req.query["pass"];
		AM.validateResetLink(email, passH, function(e) {
			if (e != 'ok') {
				res.redirect('/');
			} else {
			// save the user's email in a session instead of sending to the client //
				req.session.reset = { email:email, passHash:passH };
				res.render('reset', { title : 'Reset Password' });
			}
		})
	});
	
	router.post('/reset-password', function(req, res) {
		var nPass = req.body['pass'];
		// retrieve the user's email from the session to lookup their account and reset password //
		var email = req.session.reset.email;
		// destory the session immediately after retrieving the stored email //
		req.session.destroy();
		AM.updatePassword(email, nPass, function(e, o) {
			if (o) {
				res.status(200).send('ok');
			} else {
				res.status(400).send('Unable to update password');
			}
		})
	});
	
	/**
     * ********
     * ACCOUNTS
     * ********
     */
	router.get('/account/:userId', function(req, res) {
		AM.getAccountById(req.params.userId, function(e, o) {
			if (!o) {
				res.status(400).send(e);
			} else {
				res.json(o);
			}
		})
	});
	
	router.post('/delete', function(req, res) {
		AM.deleteAccount(req.body.id, function(e, obj) { 
			if (!e) {
				req.session.destroy(function(e){ res.status(200).send('ok'); });
			} else {
				res.status(400).send('Account not found');
			}
	    });
	});

	/**
     * ********
     * SERVICES
     * ********
     */
    router.get('/services', function(req, res) {
     	var location = req.body.location;
     	var filters = req.body.filters;

		// TODO
		SM.getServices(location, filters, function(e, o) {
			if (!o) {
				res.status(400).send(e);
			} else {
				res.status(200).send(o);
			}
		});
     });

    router.get('/services/:serviceId', function(req, res) {
     	var serviceId = req.params.serviceId;

		// TODO
		SM.getService(serviceId, function(e, o) {
			if (!o) {
				res.status(400).send(e);
			} else {
				res.status(200).send(o);
			}
		});
	});

     /**
     * *********
     * FAVORITES
     * *********
     */
    router.get('/users/:userId/favorites', function(req, res) {
     	var userId = req.params.userId;

		// TODO
		res.status(200).send('ok');
	});

	router.post('/users/:userId/favorites', function(req, res) {
     	var userId = req.params.userId;

		// TODO
		res.status(200).send('ok');
	});

	router.delete('/users/:userId/favorites/:favoriteId', function(req, res) {
		var userId = req.params.userId;
		var favoriteId = req.params.favoriteId;

		// TODO
		res.status(200).send('ok');
	});

	/**
     * **************
     * ERROR HANDLING
     * **************
     */
	router.get('*', function(req, res) { 
		res.status(404).send('Unauthorized')
	});
};
