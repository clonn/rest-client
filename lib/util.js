// require module
var _  = require("underscore"),
    url     = require("url");

// String test for http url opening.
var HTTP_REGEXP = /^http:\/\/|^https:\/\//,
    // set default url for env
    DEFAULT_URL = {
      protocol: 'http',
      host: 'api.micloud.tw:80',
      hostname: 'api.micloud.tw',
      port: 80
    },
    // env is service connect environment variable.
    DEFAULT_UTIL_ENV = {
      protocol: DEFAULT_URL.protocol,
      host: DEFAULT_URL.host,
      // url object
      url: url.format(DEFAULT_URL),
      // default use GET method
      method: 'GET',
      // default set 30 seconds
      timeout: 30000
    };

/**
 * Test url parttern by REGEXP.
 *
 * @method isHttpURL
 * @params {String} url
 * @return {Boolean}
 */
exports.isHttpURL = function (url) {
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
 * composeURL
 * compose URL path
 * @param userURL {Object}
 * return URL {String}
 */
exports.composeURL = function (userURL) {

  // set user url, and convert to domain name;
  // re-parse url object
  var urlObj,
      // for a user URL object for next convert to env.url
      userUrlBuffer = {};

  if (_.isObject(userURL)) {

    userUrlBuffer = _.extend(DEFAULT_UTIL_ENV, userURL);
    userUrlBuffer.url = url.format(userUrlBuffer);

    return userUrlBuffer;
  }

  if (utility.isHttpURL(userURL)) {

    urlObj  = url.parse(userURL);
    userUrlBuffer = _.extend(DEFAULT_UTIL_ENV, urlObj);
    userUrlBuffer.url = userURL;

  } else {

    // URL Object original attribute
    userUrlBuffer = _.extend(DEFAULT_UTIL_ENV, { pathname: userURL });
    userUrlBuffer.url = url.format(userUrlBuffer);

  }

  return userUrlBuffer;
};
