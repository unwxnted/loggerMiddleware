const config = require('./config');
const fs = require('fs');

const configParser = (req, config) => {
    let message = '';
    if (config.date) message += (new Date()).toLocaleString();
    if (config.requestIp) message += ` ${req.ip}`;
    if (config.method) message += ` ${req.method}`;
    if (config.URL) message += ` ${decodeURI(req.url)}`;
    if (config.statusCode) message += ` ${req.statusCode}`;
    if (config.statusMessage) message += ` ${req.statusMessage}`;
    if (config.headers) message += ` \n${JSON.stringify(req.headers)}`;
    if (config.body) message += ` \n${JSON.stringify(req.body)}`;
    if (config.client) message += ` \n${req.headers['user-agent']}`;

    return message;
};

const fileLogger = async (config, message) => {
    if (!config.fileLogs) return;
    return await fs.appendFile(config.filePath, message + '\n', (err) => {
        if (err) console.log(err);
    });
}

const logger = (req, res, next) => {
    const message = configParser(req, config, "");
    if (config.consoleLog) console.log(message);
    fileLogger(config, message);
    return next();
};

module.exports = { logger: logger, configParser: configParser, fileLogger: fileLogger };