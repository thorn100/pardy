const deduce = require('deduce');
const decks = require('./decks/actions');
const games = require('./games/actions');
const users = require('./users/actions');

function createStore() {
	return deduce.composeStoreMap({
		decks,
		games,
		users,
	});
}

module.exports = createStore;
