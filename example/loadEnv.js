
  // ok load
  var sl = require('../index');
  var env = sl.setEnv({
    protocol: "http",
    hostname: "yahoo.com.tw"
  });
  console.log(env);

  // ok
  var sl = require('../index');
  var env = sl.setEnv("http://yahoo.com.tw/test/0/1/");
  console.log(env);

  /*
  var sl = require('../index');
  var env = sl.setEnv("yahoo.com.tw");
  console.log(env);
  */

  /*
  // bad error;
  var sl = require('../index');
  var env = sl.setEnv({
  });
  console.log(env);
  */

