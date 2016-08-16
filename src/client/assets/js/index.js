(function () {
	const socket = io('/');

	socket.on('log', val => console.log('server says:', val));

	socket.emit('log', 'hey');
}());
