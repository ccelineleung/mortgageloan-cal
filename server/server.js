const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
const apiRouter = require('./routes/apiRouter');

// handle parsing request body
app.use(cookieParser());
app.use(bodyParser.json())
app.use(cors());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

//needed to be able to read body data
app.use(express.json()); //to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); //support URL-encoded bodies

// // basic get request to get index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// handle request for static files
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, '../client')));

// define route handlers
//routes to api are routed through apiRouter
app.use('/api', apiRouter);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => {
  res.status(404).send('404 Errors: Unknown route');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred. In global error handler' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// start server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
