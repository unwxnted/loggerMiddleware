# Logger Middleware
A Node.js middleware for logging request and response data, along with configurable options for console logs and file logs.

## Installation
Add the middleware folder in your project and, configure it.

## Usage
```
const { logger } = require('./middleware/loggerMiddleware.js');

app.use(logger);
```

## Config Options
- date: boolean, whether to include the date in the log message
- requestIp: boolean, whether to include the request IP in the log message
- method: boolean, whether to include the request method in the log message
- URL: boolean, whether to include the request URL in the log message
- statusCode: boolean, whether to include the response status code in the log message
- statusMessage: boolean, whether to include the response status message in the log message
- headers: boolean, whether to include the request headers in the log message
- body: boolean, whether to include the request body in the log message
- client: boolean, whether to include the user-agent in the log message
- consoleLog: boolean, whether to log the message to the console
- fileLogs: boolean, whether to log the message to a file
- filePath: string, the file path to save the logs if fileLogs is true

## File Log Format
Each log message will be appended to the specified file on a new line, with the following format:
```
[DATE] [REQUEST IP] [METHOD] [URL] [STATUS CODE] [STATUS MESSAGE]
[HEADERS]
[BODY]
[USER AGENT]
```

## Development Dependencies
- jest: 29.3.1

## Licensing
This project is licensed under the MIT License.
