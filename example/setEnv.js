// use rest client js.
var rc = require('../index');

// set request env
rc.set({
  url: 'http://127.0.0.1/URL'
})
// send pathname
rc.send(
  '/URL'
, function (res, body) {
  console.log(body);
});
