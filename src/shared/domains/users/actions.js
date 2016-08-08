const { User } = require('./types');

function users(initialState) {
	return initialState || {};
}

function userCreate(state, user) {
	const id = user.id;
	const localUser = User(Object.assign(
		{},
		state[id],
		user
	));

	return Object.assign(
		{},
		state,
		{ [id]: localUser }
	);
}

module.exports = {
	default: users,
	userCreate,
};
