const uuidV4 = require('uuid/v4')
var UM = require('./modules/user-manager')
  , EM = require('./modules/email-dispatcher')

module.exports = function(router) {

	/**
     * *******
     * DEFAULT
     * *******
     */
	router.get('/', function(req, res) {
	 	res.render('home', { title : 'Mow Me Home' });
	});

	/**
     * *****
     * LOGIN
     * *****
     */
    router.get('/login', function(req, res) {
	 	res.render('login', { title : 'Mow Me Login' });
	});

	router.post('/login', function(req, res) {
	 	res.render('404', { title: 'Page Not Found'}); 
	});

	router.post('/logout', function(req, res) {
		res.render('404', { title: 'Page Not Found'}); 
	});

    /**
     * *******
     * SIGN-UP
     * *******
     */
	router.get('/signup', function(req, res) {
	 	res.render('signup', { title : 'Mow Me Sign Up' })
	});

	router.post('/signup', function(req, res) {
	 	res.render('404', { title: 'Page Not Found'}); 
	});

	/**
     * **************
     * PASSWORD RESET
     * **************
     */



    /**
     * *****
     * USERS
     * *****
     */



	/**
     * ********
     * SERVICES
     * ********
     */



	/**
     * *********
     * FAVORITES
     * *********
     */




	/**
     * *****
     * LEGAL
     * *****
     */
	router.get('/about-us', function(req, res) {
		res.render('aboutUs', {title : 'About Mow Me' });
	});

	router.get('/privacy-policy', function(req, res) {
		res.render('privacyPolicy', {title : 'Mow Me\'s Privacy Policy' });
	});

	router.get('/terms-of-service', function(req, res) {
		res.render('termsOfService', {title : 'Mow Me\'s Terms of Service' });
	});
	
	/**
     * **************
     * ERROR HANDLING
     * **************
     */
	router.get('*', function(req, res) { 
		res.render('404', { title: 'Page Not Found'}); 
	});

	return router;
};
