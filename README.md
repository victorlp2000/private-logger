# private-logger

This logger uses log4js to output pre-defined format of your logs.

## installation

npm install private-logger


## usage

```javascript
var logger = require('private-logger');

// setup predefined category logger 'report', output to file './log.report.DATE.log'
var myReport = logger.setCategory('log.report', 'report');

// calls the predefined logger to output message
logger.report(logger.levels.INFO, "Some debug messages");
```

## Example
See the test-logger.js for usage.
