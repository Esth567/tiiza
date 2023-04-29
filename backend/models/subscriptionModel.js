const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../db/connect');
const UserModel = require('./userModel');
const {logger} = require('../utils/winstonLogger');
require('dotenv').config();

// class SubscriptionModel extends Model { }
const SubscriptionModel = sequelize.define('Subscription', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  customer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: UserModel,
      key: 'user_id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

(async () => {
  try {
    await sequelize.sync({force: false});
    logger.info(`Successfully created subscriptions table`, {
      module: 'subscriptionModel.js',
      status: 'Created',
      action: 'Create Table',
      statusCode: 200,
      tableName: 'subscriptions',
      DB_NAME: process.env.DB_NAME,
    });
    console.log('Table created successfully.');
  } catch (error) {
    logger.error(`${error.message}`, {
      module: 'subscriptionModel.js',
      status: 'Failed',
      action: 'Create Table',
      statusCode: 500,
      tableName: 'subscriptions',
      DB_NAME: process.env.DB_NAME,
    });
    console.error('Unable to create table:', error);
  }
})();

module.exports = SubscriptionModel;
