const {Sequelize, DataTypes} = require('sequelize');

const {sequelize} = require('../db/connect');
const UserModel = require('./userModel');
const {logger} = require('../utils/winstonLogger');
const SubscriptionModel = require('./subscriptionModel');
require('dotenv').config();

const LostItemModel = sequelize.define('lost_items', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  item_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  image_url: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  item_name: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  item_color: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  report_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  item_worth: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  lost_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  lost_location: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  customer_email: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  is_approved: {
    type: DataTypes.BOOLEAN,
    default: false,
    allowNull: false,
  },
  is_resolved: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

(async () => {
  try {
    await sequelize.sync({force: false});
    logger.info(`Successfully created lost_items table`, {
      module: 'lostItemModel.js',
      status: 'Created',
      action: 'Create Table',
      statusCode: 200,
      tableName: 'lost_items',
      DB_NAME: process.env.DB_NAME,
    });
    console.log(`lostItem Table created successfully.`);
  } catch (error) {
    logger.error(`${error.message}`, {
      module: 'lostItemModel.js',
      status: 'Failed',
      action: 'Create Table',
      statusCode: 500,
      tableName: 'lost_items',
      DB_NAME: process.env.DB_NAME,
    });
    console.error('Unable to create table:', error);
  }
})();

module.exports = LostItemModel;
