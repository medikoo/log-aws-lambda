[![Build status][circleci-image]][circleci-url]

# log4-aws-lambda

## [AWS Lambda](https://aws.amazon.com/lambda/) dedicated [log4](https://github.com/medikoo/log4/) logger

### Usage

At beginning of your lambda function::

```javascript
require("log4-aws-lambda");
```

It will have no effect when run in non AWS lambda environment (no logs will be output)

[circleci-image]: https://img.shields.io/circleci/project/github/medikoo/log4.svg
[circleci-url]: https://circleci.com/gh/medikoo/log4
