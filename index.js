"use strict";

if (!process.env.AWS_EXECUTION_ENV) return; // Do not proceed in non AWS lambda env

var format          = require("util").format
  , logger          = require("log4")
  , setupVisibility = require("log4/setup-visibility");

var conf = Object.create(null);

// Setup visibility
// Resolve from LOG_* env vars
logger.predefinedLevels.forEach(function (level) {
	var varName = "LOG_" + level.toUpperCase();
	if (process.env[varName]) conf[level] = process.env[varName].split(",");
});
// Eventually support as fallback DEBUG env var
if (!conf.debug && process.env.DEBUG) conf.debug = process.env.DEBUG.split(",");
// Do not show debug level logs by default
if (!conf.debug) conf.debug = [];
conf.debug.unshift("-*");
setupVisibility(conf);

// Log
logger.emitter.on("log", function (event) {
	var currentLogger = event.logger;
	var prefix = "[" + currentLogger.level + "]";
	if (currentLogger.ns) prefix += "[" + currentLogger.ns + "]";
	prefix += " ";
	event.messagePrefix = prefix;
	if (module.exports.prefixDecorator) prefix = module.exports.prefixDecorator(prefix);
	event.messageText = format.apply(null, event.messageTokens);
	console.log(prefix + event.messageText);
});
