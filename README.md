rest-client
==========

Rest Client 主要用於將 request 包裝起來，讓整體使用更為方便的一個 library.
connect to other RESTful service

  npm install rest-client


##install

<pre>
npm install rest-client
</pre>

h2. how to use

主要使用方法有底下幾種，

##rest-client 簡易使用方法

<pre>
// use rest client js.
var rc = require('rest-client');

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
</pre>


##rest-client 簡易使用方法

// use rest client js.
var rc = require('rest-client');

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


##rest-client 資料 POST 傳送方式

裡面可以傳送 POST, DELETE, PUT 等 WebDAV 方式，同時資料會傳送到伺服器端，

底下範例就以 form: {a:1, b:2, c:3} 傳送為範例。

<pre>

// use rest client js.
var rc = require('rest-client');

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

</pre>

##HTTP middleware Error 使用方式

<pre>

function restMethod(req, res) {
  rc.send(cfg, function (r, body) {
    console.log('hello');
    res.end('get RestFul response');
  })
  .error(function (err) {
    res.end('Request fail');
  });
}

</pre>

