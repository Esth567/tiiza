const express = require('express');
require('dotenv').config();
const app = express();
const cookiePasser = require('cookie-parser');
const routes = require('./api');
const {connectDb} = require('./db/connect');
const session = require('express-session');
const passport = require('passport');
const swaggerUI = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerJSDocs = YAML.load('./apiDocs.yaml');
const SequelizeStore = require('connect-session-sequelize')(
  session.Store,
);
const {sequelize} = require('./db/connect');
const requestIp = require('request-ip');
const PORT = process.env.PORT || 4000;
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors');
const {createServer} = require('http');
const {Server} = require('socket.io');
const {logger} = require('./utils/winstonLogger');
const {logRequest} = require('./middleware/logRequest');
const httpServer = createServer(app);
// console.log(uuidv4());
const io = new Server(httpServer, {
  /* options */
});
// require('./service/flutterwaveConfig');
require('./services/socketConfig')(io);
// store config

const sessionStore = new SequelizeStore({
  db: sequelize,
  expiration: 60 * 60 * 60 * 1000, // 1 hr
  checkExpirationInterval: 15 * 60 * 1000, // 15 minutes
  cookie: {
    maxAge: 60 * 60 * 1000, // 1 hr
    httpOnly: true,
    secure: true,
  },
});
// middle wares
app.use(logRequest);
app.use(cors());
app.use(cookiePasser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(requestIp.mw());
app.use(function (err, req, res, next) {
  const requestId = res.getHeader('X-request-Id');
  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading
    logger.error(`${err.message}`, {
      module: 'app.js',
      userId: req.user ? req.user.user_id : null,
      requestId: requestId,
      action: 'File Upload ',
      method: req.method,
      statusCode: 500,
      clientIp: req.clientIp,
    });
    res.status(500).send({
      success: false,
      payload:
        'An Error occurred while uploading file. please wait for a few seconds and  try again',
    });
    // res.status(500).send('Multer error: ' + err.message);
  } else if (err) {
    // An unknown error occurred
    logger.info(`${err.message}`, {
      module: 'Multer',
      userId: req.user ? req.user.user_id : null,
      requestId: requestId,
      method: req.method,
      action: 'File Upload ',
      statusCode: 500,
      clientIp: req.clientIp,
    });
    res.status(500).send({
      success: false,
      payload: 'Unknown error: ' + err.message,
    });
  } else {
    // No error occurred
    next();
  }
});

app.use(
  session({
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
  }),
);
app.use(passport.initialize());
app.use(passport.session());
// documentation route
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerJSDocs));
// application route
app.use('/api/v1', routes);
// error handler middleware
app.use(errorHandler);

const startApp = async () => {
  try {
    await connectDb();
    httpServer.listen(PORT, () => {
      logger.info(`App is running on port${PORT}`, {
        module: 'app.js',
        userId: null,
        requestId: null,
        action: 'Lunch server',
        statusCode: 200,
        clientIp: null,
        serverPort: PORT,
      });
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    logger.error(`${error.message}`, {
      module: 'app.js',
      userId: null,
      requestId: null,
      action: 'Lunch server',
      statusCode: 500,
      clientIp: null,
      serverPort: PORT,
    });
  }
};

// application entry point

startApp();
