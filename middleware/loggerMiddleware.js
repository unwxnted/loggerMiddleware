const config = require('./config');
const fs = require('fs');

const configParser = (req, config) => {
    let message = '';
    if (config.date) message += (new Date(req.headers.date)).toString() !== "Invalid Date" 
    ? ` ${new Date(req.headers.date).toLocaleString()}`
    : ` ${new Date().toLocaleString()}`;
    if(config.requestIp) message += ` ${req.ip}`;
    if (config.method) message += ` ${req.method}`;
    if (config.URL) message += ` ${decodeURI(req.url)}`;
    if (config.statusCode) message += ` ${req.statusCode}`;
    if (config.statusMessage) message += ` ${req.statusMessage}`;
    if (config.headers) message += ` \n${JSON.stringify(req.headers)}`;
    if (config.body) message += ` ${JSON.stringify(req.body)}`;
    if (config.client) message += ` \n${req.headers['user-agent']}`;

    return message;
};

const fileLogger = (config, message) => {
    if(!config.fileLogs) return;
    fs.appendFile(config.filePath, message + '\n', (err) =>
    {
        if (err) console.log(err);
    });
}

const logger = (req, res, next) => {
    const message = configParser(req, config, "");
    console.log(message);
    fileLogger(config, message);
    next();
};

module.exports = logger;