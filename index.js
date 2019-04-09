"use strict";

const AwsLambdaLogWriter = require("./lib/writer");

module.exports = (options = {}) => new AwsLambdaLogWriter(options);
