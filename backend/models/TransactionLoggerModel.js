const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../db/connect');
const UserModel = require('./userModel');
const {logger} = require('../utils/winstonLogger');
require('dotenv').config();

class TransactionLogModel extends Model {}
TransactionLogModel.init(
  {
    transaction_id: {
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
    transaction_type: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    transaction_ref: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    transaction_code: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    customer_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    charged: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
    },
    payment_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  },
  {sequelize, modelName: 'transaction_Log'},
);

//
(async () => {
  try {
    await sequelize.sync({force: false});
    logger.info(`Successfully created transactionLogs table`, {
      module: 'transactionLoggerModel.js',
      status: 'Created',
      action: 'Create Table',
      statusCode: 200,
      tableName: 'subscriptions',
      DB_NAME: process.env.DB_NAME,
    });
    console.log(' TransactionLog Table created successfully.');
  } catch (error) {
    logger.error(`${error.message}`, {
      module: 'transactionLoggerModel.js',
      status: 'Failed',
      action: 'Create Table',
      statusCode: 500,
      tableName: 'subscriptions',
      DB_NAME: process.env.DB_NAME,
    });
    console.error('Unable to create table:', error);
  }
})();

module.exports = TransactionLogModel;
