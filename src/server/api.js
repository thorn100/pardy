const express = require('express');
const socketio = require('socket.io');

function connectUser({ socket, userId, store }) {
	function setState() {
		const { games, users } = store.getState();

		socket.emit('log', {
			user: users[userId].emails[0].value.split('@')[0],
			games,
		});

		Object.keys(games).forEach(id => {
			const game = games[id];

			socket.to(id).emit('log', game);
		});
	}

	const removeListener = store.addListener(setState);

	socket.on('log', val => console.log('client says:', val));
	socket.on('disconnect', removeListener);

	setState();
}

function requestLogin({ socket }) {
	socket.emit('log', 'login please');
}

function createApi({ server, session, store }) {
	const app = express();
	const io = socketio(server);

	io.use((socket, cb) => {
		session(socket.request, {}, cb);
	});

	io.on('connection', socket => {
		const passport = socket.request.session.passport;
		const userId = passport && passport.user;

		if (userId) {
			connectUser({ socket, userId, store });
		}
		else {
			requestLogin({ socket });
		}
	});

	return app;
};

module.exports = createApi;
