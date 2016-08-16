const express = require('express');
const path = require('path');

function createClient() {
	const app = express();
	const clientDir = path.resolve(__dirname, '../../dist/client');

	return app
		.use(express.static(clientDir));
};

module.exports = createClient;
