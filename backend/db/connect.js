const {Sequelize} = require('sequelize');
const mysql2 = require('mysql2/promise');
const {logger} = require('../utils/winstonLogger');
require('dotenv').config();

// Create a new Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    dialectOptions: {
      // ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : false,
    },
  },
);

// Test the database connection
const connectDb = async () => {
  try {
    const connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      // ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : false,
    });
    await connection.connect();
    await connection.end();
    logger.info('Successfully Connected To Database', {
      module: 'connect.js',
      status: 'Connected',
      action: 'Connect Database ',
      statusCode: 200,
      DB_HOST: process.env.DB_HOST,
      DB_NAME: process.env.DB_NAME,
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    logger.error(`${error.message}`, {
      module: 'connect.js',
      status: 'Failed',
      action: 'Connect Database ',
      statusCode: 500,
      DB_HOST: process.env.DB_HOST,
      DB_NAME: process.env.DB_NAME,
    });
  }
};

// Export the Sequelize instance
module.exports = {connectDb, sequelize};
