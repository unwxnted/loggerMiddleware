const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { logger } = require('./middleware/loggerMiddleware.js');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger);

app.use(require('./routes/routes.js'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});