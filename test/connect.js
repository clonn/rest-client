// use rest client js.
var rc = require('../index');

rc.set({
  url: {
    protocol: 'http',
    host: 'tw.yahoo.com' + ':80',
    hostname: 'tw.yahoo.com',
    port: 80
  },
  method: 'DELETE',
  timeout:0
});
/*
// use GET method
rc.send('url', function (error, ) {

});

// use POST method
rc.send({
  uri: 'http://tw.yahoo.com',
  qs: {
    foo1: 'foo1',
    foo2: 'foo2'
  },
  method: 'POST'
}, function (response) {
  // do sth
});

rc.set({
  url: {
    protocol: 'http',
    host: 'url' + ':port',
    hostname: 'url',
    port: 80
  },
  method: 'POST',
  timeout: 30000
});

var foo = 'I am foo';

rc.fail(function (error) {
    console.log(error + foo);
})
*/
