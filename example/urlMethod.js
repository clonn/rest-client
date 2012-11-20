// use rest client js.
var rc = require('../index');

// method can be 'POST', 'GET', 'DELETE', 'PUT'
// default value is 'GET'
var method = 'POST';

// Send by URL object
rc.send({
  url: {
    protocol: 'http',
    host: 'tw.yahoo.com',
    pathname: '/hello/test/0',
    port: 80
  },
  method: method
}, function (res) {
  console.log(res);
});
