// Populate `process.env` from `.env` and `.env.local` files
require('localenv');

// Create application instance
require('./server/app')();

// Notify user
console.log('Serving on port:', process.env.PORT);
