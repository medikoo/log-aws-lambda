"use strict";

const test            = require("tape")
    , requireUncached = require("cjs-module/require-uncached")
    , overrideEnv     = require("process-utils/override-env");

test("log4-aws-lambda", t => {
	const { log, initializeWriter } = overrideEnv(() =>
		requireUncached(
			[
				require.resolve("log4"), require.resolve("log4/writer-utils/emitter"),
				require.resolve("log4/writer-utils/register-master"),
				require.resolve("log4/writer-utils/setup-visibility"), require.resolve("../")
			],
			() => ({ log: require("log4"), initializeWriter: require("../") })
		));
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
