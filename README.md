[![*nix build status][nix-build-image]][nix-build-url]
[![Windows build status][win-build-image]][win-build-url]
[![Tests coverage][cov-image]][cov-url]
![Transpilation status][transpilation-image]
[![npm version][npm-image]][npm-url]

# log4-aws-lambda

## [log4](https://github.com/medikoo/log4/) log writer for [AWS Lambda](https://aws.amazon.com/lambda/) environment

*   [Printf-like message formatting](https://github.com/medikoo/log4#output-message-formatting)
*   Configure log level visbility threshold through [`LOG_LEVEL`](https://github.com/medikoo/log4#log_level) env variable (defaults to `notice`)
*   Extra debug output can be controlled via [`LOG_DEBUG`](https://github.com/medikoo/log4#log_debug) env variable (fallbacks to `DEBUG` if provided)
*   Object inspection depth defaults to `4`, but can be overriden via `LOG_INSPECT_DEPTH` (fallbacks to `DEBUG_DEPTH` if provided)
*   Writes logs via `console.error` (not `process.stderr`) to ensure logs are exposed to CloudWatch

### Usage

At beginning of main module of your program invoke:

```javascript
require("log4-aws-lambda")();
```

### Tests

    $ npm test

[nix-build-image]: https://semaphoreci.com/api/v1/medikoo-org/log4-aws-lambda/branches/master/shields_badge.svg
[nix-build-url]: https://semaphoreci.com/medikoo-org/log4-aws-lambda
[win-build-image]: https://ci.appveyor.com/api/projects/status/fuyxafy6dvhi11s9?svg=true
[win-build-url]: https://ci.appveyor.com/project/medikoo/log4-aws-lambda
[cov-image]: https://img.shields.io/codecov/c/github/medikoo/log4-aws-lambda.svg
[cov-url]: https://codecov.io/gh/medikoo/log4-aws-lambda
[transpilation-image]: https://img.shields.io/badge/transpilation-free-brightgreen.svg
[npm-image]: https://img.shields.io/npm/v/log4-aws-lambda.svg
[npm-url]: https://www.npmjs.com/package/log4-aws-lambda
