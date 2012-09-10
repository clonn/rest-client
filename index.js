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
// String test for http url opening.
var HTTP_REGEXP = /^http:\/\//;
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
 * Setter, set env, a host environment variable.
 *
 * @method setEnv
 * @params {Object} arg
 * @return {Object} env object
 */
exports.setEnv = function (arg) {

  // get env key as an array.
  var envKeys = Object.keys(ENV_REQUIRE_KEYS);

  // parse url string to url object , using url object
  // convert url string to url Object.
  if (testHttpUrl(arg)) {
    arg = url.parse(arg);
  }

  // filter url object, it is suit on conviention.
  ENV_REQUIRE_KEYS.forEach(function (key, id) {
    if ( ! arg[key] || typeof arg[key] === "undefined") {
      throw new Error("[ERROR] env attribue " + key + " is not defiend");
    }
  });

  env = arg;
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

};
