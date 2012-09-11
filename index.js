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
    url     = require("url"),
    emitter = require('events').EventEmitter,
    // String test for http url opening.
    HTTP_REGEXP = /^http:\/\//,
    // set default url for env
    defaultUrl = {
      protocol: 'http',
      host: 'api.micloud.tw:80',
      hostname: 'api.micloud.tw',
      port: 80
    },
    // env is service connect environment variable.
    env = {
      // url object
      url: defaultUrl,
      uri: url.format(defaultUrl),
      // default use GET method
      method: 'GET',
      // default set 30 seconds
      timeout: 30000
    }
    // ==================
    //  private method
    // ==================
    testHttpUrl,


/**
 * Test url parttern by REGEXP.
 *
 * @method testHttpUrl
 * @params {String} url
 * @return {Boolean}
 */
testHttpUrl = function (url) {
  // parse url string to url object , using url object
  // convert url string to url Object.
  if (typeof url === "string") {

    // test http url opening.
    if ( ! HTTP_REGEXP.test(url)) {
      throw new Error("[ERROR] URL parttern is not match.");
      return false;
    }

    return true;
  }

  // url type is not a string
  return false;
};

/**
 * Set timeout, set time second
 *
 * @method setTimeout
 * @params {Int} time
 * @return {Int} time
 */
exports.setTimeout = function (time) {
  time = parseInt(time, 10);
  if (time < 1000) {
    throw new Error("[Error] setTimeout, time second need more than 1000 or an integer");
    return;
  }

  return TIMEOUT = time;
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
  for (i in arg) {
    env[i] = arg[i];
  }

  // Always set Timeout more than 0
  env.timeout = ((env.timeout = parseInt(env.timeout, 10)) > 0) ? env.timeout : 30000;

  // re-parse url object
  if (env.url && typeof env.url === "object") {
    env.uri = url.format(env.url);
  }

  return env;
};

/**
 * Send data
 *
 * @method send
 * @params {Object} arg
 * @return {Object} env object
 */
exports.send = function (reqUrl, callback) {

  // set option to env
  option.timeout = TIMEOUT;
  option = setEnvFlag ? env : this.setEnv(option);

  // Send request
  request(arg, function (error, res, body) {
    if (error) {
      this.fire('error', function (error) {

      });
    }
    // TODO: need to warp it to easy use.
    callback(res, body);
  });
};

exports.fail = function (callback) {

}
