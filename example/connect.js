// use rest client js.
var rc = require('../index');

// set error.
rc.error(function (error) {
  console.log('fuck get error' + error);
});

// normal url
rc.send(
  'http://211.78.255.51'
, function (res, body) {
  console.log(body);
});

// set request env
rc.set({
  url: 'http://211.78.255.51'
})

// send pathname
rc.send(
  '/post.php'
, function (res, body) {
  console.log(body);
});

// send https
rc.send({
  url: 'https://micloud.tw',
}, function (res, body) {
  console.log(res, body);
});

// send by params and POST
rc.send({
  url: 'http://211.78.255.51/post.php',
  form: {
    a:1,
    b:2,
    c:3
  },
  method: 'POST'
}, function (res, body) {
  console.log(body);
});

// Send by URL object
rc.send({
  url: {
    protocol: 'http',
    host: 'tw.yahoo.com',
    hostname: 'tw.yahoo.com',
    pathname: '/hello/test/0',
    port: 80
  },
  method: 'POST'
}, function (res) {
  console.log(res);
});
