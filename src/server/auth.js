const express = require('express');
const passport = require('passport');
const { Strategy } = require('passport-google-oauth20');

const {
	AUTH_CLIENT_ID,
	AUTH_CLIENT_SECRET,
	AUTH_CALLBACK,
	AUTH_SCOPE,
} = process.env;

function createStrategy({ store }) {
	const config = {
		clientID: AUTH_CLIENT_ID,
		clientSecret: AUTH_CLIENT_SECRET,
		callbackURL: AUTH_CALLBACK,
	};

	passport.use(new Strategy(config, (a, b, user, cb) => {
		store.userCreate(user);

		cb(null, user.id);
	}));

	passport.serializeUser((id, cb) => cb(null, id));

	passport.deserializeUser((id, cb) => cb(null, id));

	passport.middleware = passport.authenticate('google', {
		scope: [AUTH_SCOPE],
	});

	return passport;
}

function createAuth({ store }) {
	const app = express()
	const strategy = createStrategy({ store });

	return app
		.use(strategy.initialize())
		.use(strategy.session())
		.get('/', strategy.middleware)
		.get('/callback', strategy.middleware, (req, res) => {
			res.redirect('/');
		});
};

module.exports = createAuth;
