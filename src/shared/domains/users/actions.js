const { User } = require('./types');

function users(initialState) {
	return initialState || {};
}

function userCreate(state, user) {
	User(user);

	const localUser = Object.assign(
		{},
		state[user.id],
		user
	);

	return Object.assign(
		{},
		state,
		{ [user.id]: user }
	);
}

module.exports = {
	default: users,
	userCreate,
};
