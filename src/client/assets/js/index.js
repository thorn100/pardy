(function () {
	var socket = io('/');

	socket.on('log', function(val) {
		console.log('log', val);
	});
}());
