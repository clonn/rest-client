// use rest client js.
var rc = require('../index');

/**
 * Simple method to send request.
 */
rc.send('http://127.0.0.1/URL');

/**
 * Set ERROR
 * the parameter will pass the error message to callback.
 */
rc.error(function (error) {
  console.log('[STATUS] ERROR: ' + error);
});

