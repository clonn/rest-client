// use rest client js.
var rc = require('../index');

/**
 * Simple method to send request.
 */
rc.send('http://127.0.0.1/URL');

/**
 * Simple send request with callback function
 * @param res {Object Response}
 * @param body {String }
 */
rc.send(
  'http://127.0.0.1/URL'
, function (res, body) {
  console.log(body);
});
