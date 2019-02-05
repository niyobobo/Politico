const express = require('express');
const morgan = require('morgan');
const partyRoute = require('./routes/partyRoute');
const officeRoute = require('./routes/officeRoute');

const app = express();

app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({
  extended: true,
}));

app.use('/api/v1/offices', officeRoute);
app.use('/api/v1/parties', partyRoute);

app.use('/api/v1', (req, res) => res.status(400).send({
  status: res.statusCode,
  message: 'Bad URL format. Please check your URL or Method for error',
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server connected to  port ${PORT}`));

module.exports = app;
