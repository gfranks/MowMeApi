const uuidV4 = require('uuid/v4')
var UM = require('./modules/user-manager')
  , EM = require('./modules/email-dispatcher')
  , SM = require('./modules/service-manager')
  , FM = require('./modules/favorite-manager')
  , sessionHeader = 'x-session-id'

Session = require("./models/session.js")
Error = require("./models/error.js")

module.exports = function(router) {

	/**
     * *******
     * SESSION
     * *******
     */
     router.get('/session', function(req, res) {
		var session = new Session();
		session.token = uuidV4();
		res.status(200).send(session);
     });
	
	/**
     * *****
     * LOGIN
     * *****
     */
	router.post('/login', function(req, res) {
		UM.login(req.body['email'], req.body['password'], function(err, user) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				FM.migrateFavoritedServices(req.headers[sessionHeader], user.id);
				res.status(200).send(user);
			}
		});
	});

	router.post('/logout', function(req, res) {
		var session = new Session();
		session.token = uuidV4();
		res.status(200).send(session);
	})

	/**
     * *******
     * SIGN-UP
     * *******
     */
	router.post('/signup', function(req, res) {
		var sessionId = req.headers[sessionHeader];
		UM.createUser(sessionId, req.body, function(err, user) {
			if (err) {
				res.status(400).send(Error.makeError(err));
			} else {
				console.log(user);
				FM.migrateFavoritedServices(req.headers[sessionHeader], user.id);
				res.status(200).send(user);
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
		UM.getUserById(req.body['userId'], function(err1, user) {
			if (err1) {
				res.status(404).send(Error.makeError(err1));
			} else {
				EM.dispatchResetPasswordLink(o, function(err2, m) {
					// this callback takes a moment to return //
					// TODO add an ajax loader to give user feedback //
					if (!err2) {
						res.sendStatus(200);
					} else {
						for (k in err2) {
							console.log('ERROR : ', k, err2[k]);
						}
						res.status(400).send(Error.makeError('Unable to dispatch password reset'));
					}
				});
			}
		});
	});

	router.get('/reset-password', function(req, res) {
		var email = req.query["email"];
		var passH = req.query["password"];
		UM.validateResetLink(email, passH, function(err) {
			if (err != 'ok') {
				res.redirect('/');
			} else {
				res.render('reset', { title : 'Reset Password' });
			}
		})
	});
	
	router.post('/reset-password', function(req, res) {
		var nPass = req.body['password'];
		var userId = req.cookie.userId;
		UM.updatePassword(userId, nPass, function(err, user) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				// TODO: reset session?
				res.sendStatus(200);
			}
		});
	});
	
	/**
     * *****
     * USERS
     * *****
     */
	router.get('/users/:userId', function(req, res) {
		UM.getUserById(req.params.userId, function(err, user) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				res.status(200).send(user);
			}
		})
	});

	router.post('/users/:userId', function(req, res) {
		UM.updateUser(req.params.userId, req.body, function(err, user) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				res.status(200).send(user);
			}
		});
	});
	
	router.delete('/users/:userId', function(req, res) {
		UM.deleteUser(req.params.userId, function(err, obj) { 
			if (err) {
				var session = new Session();
				session.token = uuidV4();
				res.status(200).send(session);
			} else {
				res.status(404).send(Error.makeError(err));
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
		SM.getServices(location, filters, function(err, services) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				res.status(200).send(services);
			}
		});
     });

    router.get('/services/:serviceId', function(req, res) {
     	var serviceId = req.params.serviceId;

		// TODO
		SM.getService(serviceId, function(err, service) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				res.status(200).send(service);
			}
		});
	});

     /**
     * *********
     * FAVORITES
     * *********
     */
     router.get('/favorites', function(req, res) {
     	var sessionId = req.headers[sessionHeader];
		FM.getFavorites(sessionId, function(err, favorites) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				res.status(200).send(favorites);
			}
		});
	});

    router.get('/users/:userId/favorites', function(req, res) {
     	var userId = req.params.userId;
		FM.getFavorites(userId, function(err, favorites) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				res.status(200).send(favorites);
			}
		});
	});

	router.post('/favorites/:serviceId', function(req, res) {
		var sessionId = req.headers[sessionHeader];
     	var serviceId = req.params.serviceId;
		FM.favoriteService(sessionId, serviceId, function(err, favorite) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				res.status(200).send(favorite);
			}
		});
	});

	router.post('/users/:userId/favorites/:serviceId', function(req, res) {
     	var userId = req.params.userId;
     	var serviceId = req.params.serviceId;
		FM.favoriteService(userId, serviceId, function(err, favorite) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				res.status(200).send(favorite);
			}
		});
	});

	router.delete('/favorites/:serviceId', function(req, res) {
		var sessionId = req.headers[sessionHeader];
		var serviceId = req.params.serviceId;
		FM.unfavoriteService(sessionId, serviceId, function(err, favorite) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				res.sendStatus(200);
			}
		});
	});

	router.delete('/users/:userId/favorites/:serviceId', function(req, res) {
		var userId = req.params.userId;
		var serviceId = req.params.serviceId;
		FM.unfavoriteService(userId, serviceId, function(err, favorite) {
			if (err) {
				res.status(404).send(Error.makeError(err));
			} else {
				res.sendStatus(200);
			}
		});
	});

	/**
     * **************
     * ERROR HANDLING
     * **************
     */
	router.get('*', function(req, res) { 
		res.status(404).send(Error.makeError('Unauthorized'));
	});

	return router;
};