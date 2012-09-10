/**
 *
 * MiCloud system connector, link to other RESTful service on the internet.
 *
 * @module service-connector
 * @author Caesar
 * @clonncd@gmail.com
 *
 */

var request = require("request");
var url = require("url");
var setEnvFlag = false;
// String test for http url opening.
var HTTP_REGEXP = /^http:\/\//;
// default setting Timeout is 30 second.
var TIMEOUT = 30 * 1000;
// env require keys.
var ENV_REQUIRE_KEYS = [
  "hostname",
  "protocol"
];
// env is service connect environment variable.
var env = {};


/**
 * Test url parttern by REGEXP.
 *
 * @method testHttpUrl
 * @params {String} url
 * @return {Boolean}
 */
var testHttpUrl = function (url) {
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
exports.setEnv = function (arg) {

  // get env key as an array.
  var envKeys = Object.keys(ENV_REQUIRE_KEYS);

  if (typeof arg !== "object") {
    throw new Error("[ERROR] setEnv, params should an object");
    return false;
  }

  // parse url string to url object , using url object
  // convert url string to url Object.
  if (testHttpUrl(arg)) {
    arg = url.parse(arg);
  }

  env = arg;

  // filter url object, it is suit on conviention.
  ENV_REQUIRE_KEYS.forEach(function (key, id) {
    if ( ! arg[key] || typeof arg[key] === "undefined") {
      throw new Error("[ERROR] env attribue " + key + " is not defiend");
    }
  });

  setEnvFlag = true;
  return env;
};

/**
 * Send data
 *
 * @method send
 * @params {Object} arg
 * @return {Object} env object
 */
exports.send = function (arg, callback) {
  console.log('run send');

  var option = arg;


  // set option to env
  option.timeout = TIMEOUT;
  option = setEnvFlag ? env : this.setEnv(option);

  // Send request
  request(arg, function (error, res, body) {
    // TODO: need to warp it to easy use.
    callback(error, res, body);
  });
};
