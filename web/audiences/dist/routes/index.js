/**
 * This file is where you define your application routes and controllers.
 *
 * Start by including the middleware you want to run for every request;
 * you can attach middleware to the pre('routes') and pre('render') events.
 *
 * For simplicity, the default setup for route controllers is for each to be
 * in its own file, and we import all the files in the /routes/views directory.
 *
 * Each of these files is a route controller, and is responsible for all the
 * processing that needs to happen for the route (e.g. loading data, handling
 * form submissions, rendering the view template, etc).
 *
 * Bind each route pattern your application should respond to in the function
 * that is exported from this module, following the examples below.
 *
 * See the Express application routing documentation for more information:
 * http://expressjs.com/api.html#app.VERB
 */
var _ = require('underscore');
var keystone = require('keystone');
var middleware = require('./middleware');
var importRoutes = keystone.importer(__dirname);
// var User = require('keystone').list('User').model;

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

//newly added test for sign in redirect
keystone.pre('render', middleware.nonAdminSignIn);



// Import Route Controllers
var routes = {
	views: importRoutes('./views'),
	api: importRoutes('./api')
};

// Setup Route Bindings
exports = module.exports = function (app) {
	// Views
	app.get('/audiences/:audience', routes.views.audience);
	app.get('/audiences', routes.views.audiences);
	// NOTE: To protect a route so that only admins can see it, use the requireUser middleware:
	// app.get('/protected', middleware.requireUser, routes.views.protected);

	app.get('/api/audiences/list', keystone.middleware.api, routes.api.audiences.list);
	// app.all('/api/audience/create', keystone.initAPI, routes.api.posts.create);
	app.get('/api/audiences/:id', keystone.middleware.api, routes.api.audiences.get);
	app.all('/api/audiences/:id/update', keystone.middleware.api, routes.api.audiences.update);


	//The 404 Route (ALWAYS Keep this as the last route)
	app.get('*', function(req, res){
	   res.redirect('/audiences');
	});
};