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
				require.resolve("log/lib/emitter"), require.resolve("log/lib/get-master-writer"),
				require.resolve("log/lib/abstract-writer"),
				require.resolve("log/lib/setup-visibility"), require.resolve("../../lib/writer")
			],
			() => {
				const LogWriter = require("../../lib/writer");
				return { log: require("log"), initializeWriter: () => new LogWriter() };
			}
		);
	} finally {
		restoreEnv();
	}
};

test("log-aws-lambda", t => {
	const { log, initializeWriter } = resolveUncached();
	initializeWriter();
	const originalWrite = console.error;
	let isInvoked = false;
	console.error = string => {
		t.equal(
			string,
			`${ log.error.get("elo").levelMessagePrefix } ${
				log.error.get("elo").namespaceMessagePrefix
			} foo bar`,
			"Should write logs for enabled loggers to stderr"
		);
		isInvoked = true;
	};
	log("not enabled");
	t.equal(isInvoked, false, "Should not write logs of disabled loggers");
	log.error.get("elo")("foo bar");
	t.equal(isInvoked, true, "Should write logs immediately");
	console.error = originalWrite;
	t.end();
});
