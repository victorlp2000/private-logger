var fs = require('fs');
var logger = require('private-logger');

/* create folder for saving log files */
var folder = './logs';
if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
}

/* setup loggers */
var logRequest = logger.setCategory(folder + '/log.webrequest', 'request');
var logReport = logger.setCategory(folder + '/log.report', 'report');

/* use created logger output messages */
logger.request();
logRequest();

logger.report(logger.levels.ERROR, 'report message');
logReport(logger.levels.ERROR, 'report message');
