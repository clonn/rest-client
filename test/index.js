/**
 *
 * MiCloud system connector, link to other RESTful service on the internet.
 *
 * @module service-connector
 * @author Caesar
 * @clonncd@gmail.com
 *
 */

var request = require('request');
var times = 0;
request({
  uri: 'http://211.78.255.51/timeout.php',
  timeout: 15000
},
function (error, response, body) {

  times += 1;
  console.log(times);

  console.log('-- error --');
  console.dir(error) // Print the google web page.
  console.log('-- body --');
  console.dir(body);

});
var params = {
  a: 1,
  b: 2
};
var qs = require('querystring');

request({
  uri: 'http://211.78.255.51/info.php',
  qs: params,
  form: {
    posta: 'aaaaaaaa',
    postb: 'bbbbbbbb'
  },
  timeout: 10000,
},
function (error, response, body) {

  times += 1;
  console.log(times);

  console.log('-- error --');
  console.dir(error) // Print the google web page.
  console.log('-- body --');
  console.dir(body);

});

request({
  uri: 'http://211.78.255.51/direct.php',
  qs: params,
  form: {
    posta: 'aaaaaaaa',
    postb: 'bbbbbbbb'
  },
  followAllRedirects: true
},
function (error, response, body) {

  times += 1;
  console.log(times);

  console.log('-- error --');
  console.dir(error) // Print the google web page.
  console.log('-- body --');
  console.dir(body);

});
