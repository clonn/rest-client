// use rest client js.
var rc = require('../index');

// method can be 'POST', 'GET', 'DELETE', 'PUT'
// default value is 'GET'
var method = 'POST';

// Send by URL object
rc.send({
  url: 'http://127.0.0.1/URL',
  method: method
}, function (res) {
  console.log(res);
});

// Send by PARAMS to Server
rc.send({
  url: 'http://127.0.0.1/URL',
  form: {
    a:1,
    b:2,
    c:3
  },
  method: method
}, function (res, body) {
  console.log(body);
});
