const { configParser, fileLogger } = require('../middleware/loggerMiddleware.js');
const fs = require('fs');

describe('logger functionalities', () => {
    it('should return the correct message based of a config', () => {

        const req = {
            ip: '127.0.0.1',
            method: 'GET',
            url: '/test',
            statusCode: 200,
            statusMessage: 'OK',
            headers: { 'content-type': 'application/json', 'date': (new Date().toLocaleString()), 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36' },
            body: { key: 'value' },
        };

        const config = {
            date: true,
            requestIp: true,
            method: true,
            URL: true,
            statusCode: true,
            statusMessage: true,
            headers: true,
            body: true,
            client: true,
        };

        const message = configParser(req, config);
        expect(message).toBe(`${(new Date()).toLocaleString()} 127.0.0.1 GET /test 200 OK \n{"content-type":"application/json","date":"${(new Date()).toLocaleString()}","user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"} \n{"key":"value"} \nMozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36`)
    });

    it('should write in the file the correct message', async () => {
        const config = {
            fileLogs: true,
            filePath: './logs.logs'
        };

        fs.writeFileSync(config.filePath, '');

        const message = '10/1/2023 22:02:51 ::1 GET / null null {} Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36';

        await fileLogger(config, message);

        const fileContent = await new Promise((resolve, reject) => {
            fs.readFile(config.filePath, (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
        expect(fileContent.toString()).toBe(`${message}\n`);
        fs.unlinkSync(config.filePath);
    });

});

