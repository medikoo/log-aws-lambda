"use strict";

const test            = require("tape")
    , requireUncached = require("ncjsm/require-uncached")
    , overrideEnv     = require("process-utils/override-env");

const resolveUncached = () => {
	const { restoreEnv } = overrideEnv();
	try {
		return requireUncached(
			[
				require.resolve("log"), require.resolve("log/lib/private/logger-prototype"),
				require.resolve("log/lib/abstract-writer"), require.resolve("log/lib/emitter"),
				require.resolve("log/lib/get-master-writer"),
				require.resolve("log/lib/setup-visibility"), require.resolve("../"),
				require.resolve("../lib/writer")
			],
			() => ({ log: require("log"), initializeWriter: require("../") })
		);
	}
	finally { restoreEnv(); }
};

test("log-aws-lambda", t => {
	const { log, initializeWriter } = resolveUncached();
	initializeWriter();
	const originalWrite = console.error;
	console.error = string => {
		t.equal(
			string,
			`${ log.error.get("elo").levelMessagePrefix } ${
				log.error.get("elo").namespaceMessagePrefix
			} foo bar`,
			"Should write logs for enabled loggers to stderr"
		);
		console.error = originalWrite;
		t.end();
	};
	log.error.get("elo")("foo bar");
});
