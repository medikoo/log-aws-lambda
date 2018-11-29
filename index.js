"use strict";

const d               = require("d")
    , rootLogger      = require("log")
    , emitter         = require("log/writer-utils/emitter")
    , registerMaster  = require("log/writer-utils/register-master")
    , setupVisibility = require("log/writer-utils/setup-visibility")
    , formatMessage   = require("log-node/utils/format-event-message")
    , levelPrefixes   = require("log-node/utils/level-prefixes");

const setupPrefixes = levelLogger => {
	levelLogger.levelMessagePrefix = levelPrefixes[levelLogger.level];
	Object.defineProperty(
		levelLogger, "namespaceMessagePrefix", d.gs(function () { return this.namespace; })
	);
};

module.exports = () => {
	// Ensure it's the only log writer initialzed in a process
	registerMaster();

	// Read logs visiblity settings from env variables
	setupVisibility(
		process.env.LOG_LEVEL, (process.env.LOG_DEBUG || process.env.DEBUG || "").split(",")
	);

	// Resolve level and namespace log message prefixes
	// - for already initialized loggers
	rootLogger.getAllInitializedLevels().forEach(setupPrefixes);
	// - for loggers to be initialized
	emitter.on("init", event => { if (!event.logger.namespace) setupPrefixes(event.logger); });

	// Write logs to stderr
	emitter.on("log", event => {
		if (!event.logger.isEnabled) return;
		formatMessage(event);
		console.error(event.message);
	});
};
