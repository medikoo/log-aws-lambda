"use strict";

const formatParts  = require("sprintf-kit/format-parts")
    , LogWriter    = require("log/lib/writer")
    , resolveParts = require("log-node/lib/resolve-format-parts");

module.exports = class AwsLambdaLogWriter extends LogWriter {
	constructor(options = {}) { super(process.env, options); }
	resolveMessageContent(event) {
		event.messageContent = formatParts(resolveParts(...event.messageTokens));
	}
	writeMessage(event) { console.error(event.message); }
};
