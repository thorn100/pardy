const express = require('express');
const socketio = require('socket.io');

function createApi({ http, session, store }) {
	const app = express();
	const io = socketio(http);

	io.use((socket, cb) => {
		session(socket.request, {}, cb);
	});

	io.on('connection', socket => {
		socket.emit('log', store.getState());

		store.addListener(() => {
			socket.emit('log', store.getState());
		});
	});

	return app;
};

module.exports = createApi;
