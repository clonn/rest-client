/**
 *
 * MiCloud system connector, link to other RESTful service on the internet.
 *
 * @module service-connector
 * @author Caesar
 * @clonncd@gmail.com
 *
 */

var request = require("request"),
    util    = require('util'),
    url     = require("url"),
    _       = require("underscore"),
    Emitter  = require('events').EventEmitter,
    emitter = new Emitter(),
    // a fail event name
    EVENT_FAIL_NAME = 'onerror',
    // String test for http url opening.
    HTTP_REGEXP = /^http:\/\/|^https:\/\//,
    // set default url for env
    defaultURL = {
      protocol: 'http',
      host: 'api.micloud.tw:80',
      hostname: 'api.micloud.tw',
      port: 80
    },
    // for a user URL object for next convert to env.url
    userUrlBuffer = {},
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
    },
    // ==================
    //  private method
    // ==================
    sendRequest,
    composeURL,
    isHttpURL;

sendRequest = function (requestObj, callback) {
  if (_.isObject(requestObj)) {

    // show url
    console.log("[STATUS] sendRequest, url: " + env.url);

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



composeURL = function (userURL) {
  // set user url, and convert to domain name;
  // re-parse url object
  var urlObj;

  if (_.isObject(userURL)) {

    userUrlBuffer = _.extend(env, userURL);
    env.url = url.format(userUrlBuffer);

    return env.url;

  }

  if (isHttpURL(userURL)) {

    urlObj  = url.parse(userURL);
    userUrlBuffer = _.extend(env, urlObj);
    env.url = userURL;

  } else {

    // URL Object original attribute
    userUrlBuffer = _.extend(env, { pathname: userURL });
    env.url = url.format(userUrlBuffer);

  }

  return env.url;

};

/**
 * Test url parttern by REGEXP.
 *
 * @method isHttpURL
 * @params {String} url
 * @return {Boolean}
 */
isHttpURL = function (url) {
  // parse url string to url object , using url object
  // convert url string to url Object.
  if (typeof url === "string") {

    // test http url opening.
    if ( ! HTTP_REGEXP.test(url)) {
      return false;
    }

    return true;
  }

  // url type is not a string
  return false;
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

  // Always set Timeout more than 0
  if (arg.timeout) {
    env.timeout = ((env.timeout = parseInt(env.timeout, 10)) > 0) ? env.timeout : 30000;
  }

  composeURL(env.url);

  console.log('[STATUS] restClient set url: ' + env.url);
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
    env = _.extend(env, reqURL);
  }

  if (typeof reqURL === "string") {
    env.url = reqURL;
  }

  // Check URL string, and suit on http portocal.
  composeURL(env.url);

  return sendRequest(env, callback);

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
};

