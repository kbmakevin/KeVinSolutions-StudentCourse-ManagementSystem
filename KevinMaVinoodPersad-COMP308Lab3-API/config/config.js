/**
 * 
 * @file        config.js
 * @description this file simply loads the correct configuration file according to the process.env.NODE_ENV environment variable.
 * @author      Kevin Ma, Vinood Persad
 * @date        2018.03.21
 * 
 */

module.exports = require('./env/' + process.env.NODE_ENV + '.js');