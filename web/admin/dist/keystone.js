// Require keystone
var keystone = require('keystone');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({
	'name': 'Keystone',
	'brand': 'Keystone',
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/admin/favicon.ico',
	'views': 'templates/views',
	'view engine': 'pug',
	'host':'127.0.0.1',
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	'session store': 'connect-redis',
	'session store options': {
		"host": 'redis', // Redis server hostname
		"port": '6379', // Redis server port
		"ttl": '260',
	}
});

// Load your project's Models
keystone.import('models');

// Load your project's Routes
keystone.set('routes', require('./routes'));

// Configure the navigation bar in Keystone's Admin UI
keystone.set('nav', {
	users: 'users',
	audiences: ['audiences', 'audience-categories'],
});

keystone.set('admin path', 'admin');

keystone.set('signin url', '/signin');
keystone.set('signout url', '/signout');
keystone.set('signin redirect', '/');

// Start Keystone to connect to your database and initialise the web server
keystone.start();
