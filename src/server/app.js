const express = require('express');
const createSession = require('express-session');

const createApi = require('./api');
const createAuth = require('./auth');
const createClient = require('./client');
const createStore = require('../shared/domains/store');

const {
	PORT,
	SESSION_SECRET,
} = process.env;

function createApp() {
	const app = express();
	const container = {
		server: app.listen(PORT),
		store: createStore(),
		session: createSession({
			resave: false,
			saveUninitialized: false,
			secret: SESSION_SECRET,
		}),
	};

	return app
		.use(container.session)
		.use('/', createClient(container))
		.use('/api', createApi(container))
		.use('/auth', createAuth(container));
}

module.exports = createApp;
