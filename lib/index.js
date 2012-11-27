/**
 *
 * MiCloud system connector, link to other RESTful service on the internet.
 *
 * @module service-connector
 * @author Caesar
 * @clonncd@gmail.com
 *
 */
var _       = require("underscore"),
    Emitter = require('events').EventEmitter,
    emitter = new Emitter(),
    request = require("request"),
    util    = require('util'),
    url     = require("url");
    utility = require('./util'),
    // a fail event name
    EVENT_FAIL_NAME = 'onerror',
    // set default url for env
    defaultURL = {
      protocol: 'http',
      host: 'api.micloud.tw:80',
      hostname: 'api.micloud.tw',
      port: 80
    },
    // env is service connect environment variable.
    env = {
      protocol: defaultURL.protocol,
      host: defaultURL.host,
      // url object
      url: url.format(defaultURL),
      // default use GET method
      method: 'GET',
      // default set 30 seconds
      timeout: 30000
    };

exports.__sendRequest = function (requestObj, callback) {
  if (_.isObject(requestObj)) {

    // show url
    console.log("[STATUS] RestClient request send, URL: " + env.url);
    console.log("[STATUS] RestClient request send, Method: " + env.method);

    var requestUrlObj = env;
    requestUrlObj.protocol = undefined;

    request(
      requestUrlObj,
      function (error, res, body) {

        // send error message
        if (error) {
          return emitter.emit(EVENT_FAIL_NAME, new Error('[ERROR] can not connect to server, url: ' + env.url));
        }

        // normal send request
        try {
          var data = JSON.parse(body);
        } catch (e) {
          var data = {
            status: 'ERROR',
            message: 'Data convert to JSON fail'
          };
        }
        callback(res, data);
      }
    );
  }
};


/**
 * Setter, set env, a host environment variable.
 *
 * @method setEnv
 * @params {Object} url object
 * @return {Object} env object
 */
exports.set = function (arg) {
  var i;

  // prevent user get wrong type
  if (typeof arg !== "object") {
    return console.warn('[ERROR] set must have an Object parameter');
  }

  // set new attributes to env object
  env = _.extend(env, arg);
  env.method = "GET";

  // Always set Timeout more than 0
  if (arg.timeout) {
    env.timeout = ((env.timeout = parseInt(env.timeout, 10)) > 0) ? env.timeout : 30000;
  }

  env = utility.composeURL(env.url);

  return env;
};

/**
 * Send data
 *
 * @method send
 * @params {Object} arg
 * @return {Object} env object
 */
exports.send = function (reqURL, callback) {

  // URL must be a object.
  if (_.isObject(reqURL)) {

    // Set User HTTP Method, or use GET to default value.
    reqURL.method = reqURL.method ? reqURL.method : 'GET';

    env = _.extend(env, reqURL);

  }

  if (typeof reqURL === "string") {
    env.url = reqURL;
    env.method = 'GET';
  }

  // Check URL string, and suit on http portocal.
  env = utility.composeURL(env);
  exports.__sendRequest(env, callback);

  // return restClient module.
  return exports;
};

/**
 * Send data
 *
 * @method send
 * @params {Object} arg
 * @return {Object} env object
 */
exports.error = function (callback) {
  emitter.on(EVENT_FAIL_NAME, callback);

  // return restClient module.
  return exports;
};

