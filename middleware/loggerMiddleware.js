const config = require('./config');

const configParser = (req, config) => {
    let message = '';
    if (config.date) message += (new Date(req.headers.date)).toString() !== "Invalid Date" 
    ? ` ${new Date(req.headers.date).toLocaleString()}`
    : ` ${new Date().toLocaleString()}`;
    if (config.method) message += ` ${req.method}`;
    if (config.URL) message += ` ${decodeURI(req.url)}`;
    if (config.statusCode) message += ` ${req.statusCode}`;
    if (config.statusMessage) message += ` ${req.statusMessage}`;
    if (config.headers) message += ` \n${JSON.stringify(req.headers)}`;
    if (config.body) message += ` ${JSON.stringify(req.body)}`;
    if (config.client) message += ` \n${req.headers['user-agent']}`;

    return message;
};

const logger = (req, res, next) => {

    console.log(configParser(req, config, ""));
    next();
};

module.exports = logger;