var path = require('path');
var fs = require('fs');
var log4js = require('log4js');

/**
	customized logger function 1
 */
function logRequest() {
    var logger = log4js.getLogger('request');
    logger.log(log4js.levels.ERROR, 'message...');
}

/**
	customized logger function 2
 */
function logReport(level, message) {
    var logger = log4js.getLogger('report');
    logger.log(level, message);
}

/**
	pre-defnied categories and associated function entry
 */
var cetegories = {
	'request': logRequest,
	'report': logReport
};


/**
	setup a 'dateFile' type of log, which create new log file daily
	returns logger function. the logger function is also exported.

	@param logFile - the filename of the log, the folder has to be created
			before call this function

	@categoryName - specific name of the logger
 */
function setCategory(logFile, categoryName) {
	var config = {
	  	"type": "dateFile",
      	"category": categoryName,
      	"absolute": true,
      	"filename": logFile,
      	"pattern":".yyyy-MM-dd.log",
      	"alwaysIncludePattern":true,
      	"layout": {
          	"type": "pattern",
          	"pattern": "%m"
      	}
	};

    // log folder must exist
	var folder = path.dirname(logFile);
	if (!fs.existsSync(folder)) {
		throw new Error("folder does not exists: " + folder);
	}

    // setup only for the pre-defined categories
	var cetegory = cetegories[categoryName];
	if (cetegory == undefined) {
        throw new Error("no pre-defined category: " + categoryName);
    }

    // load and add the appender
    if (!log4js.appenderMakers[config.type]) {
        log4js.loadAppender(config.type);
    }
    var appender = log4js.appenderMakers[config.type](config);
    log4js.addAppender(appender, categoryName);

    // export the logger
    module.exports[categoryName] = cetegory;
    return cetegory;
}

module.exports = {
	levels: log4js.levels,
	setCategory: setCategory
}