var http = require('http');
var url  = require('url');
var rc = require('../index');

// HTTP web server
// Create a WEB Server
var server = http.createServer(function (req, res) {
  var path = url.parse(req.url);
  console.log(path.pathname);
  switch(path.pathname) {
    case '/post':
    case '/get':
      restMethod(req, res);
      break;
    case '/':
    default:
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('hello world');
      break;
  }
}).listen(3000, '127.0.0.1');

// RestClient Test methmod
function restMethod(req, res) {

  var path = url.parse(req.url);
  var cfg = {};

  // check post and get method
  switch(path.pathname) {
    case '/post':
      cfg = {
        url:'http://192.168.0.1/404',
        method: 'POST',
        timeout: 3000
      };
      break;
    case '/get':
      cfg = {
        url:'http://127.0.0.1:3000/',
        timeout: 3000
      };
      break;
  }

  // RestClient set callback and set error callback function.
  rc.send(cfg, function (r, body) {
    console.log('hello');
    res.end('get RestFul response');
  })
  .error(function (err) {
    res.end('Request fail');
  });
}
