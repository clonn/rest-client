
/*
// ok load
var sl = require('../index');
sl.send('http://yahoo.com.tw/', function (error, res,body) {
  console.log(error);
  console.log(body);
});
*/

// ok load
var sl = require('../index');
sl.send({
  uri: 'http://tw.yahoo.com',
  qs: {
    a: 1,
    b: 2
  }
}, function (error, res,body) {
  console.log(error);
  console.log(body);
});

var sc = require('../index');
sc.setEnv({
  uri: 'http://tw.yahoo.com'
  qs: 'string || object'
  timeout: 30000
})
