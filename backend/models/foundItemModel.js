const {Sequelize, DataTypes} = require('sequelize');

const {sequelize} = require('../db/connect');
const UserModel = require('./userModel');
const {logger} = require('../utils/winstonLogger');
require('dotenv').config();

const FoundItemModel = sequelize.define('found_items', {
  item_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  image_url: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  item_type: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  item_name: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  item_color: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
  discovery_location: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },

  date_found: {
    type: DataTypes.DATE,
    allowNull: false,
    // defaultValue: new Date().now
  },
  pickup_location: {
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
    references: {
      model: UserModel,
      key: 'email',
    },
  },
  phone_number: {
    type: DataTypes.STRING(45),
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
    logger.info(`Successfully created found_items table`, {
      module: 'foundItemModel.js',
      status: 'Created',
      action: 'Create Table',
      statusCode: 200,
      tableName: 'found_items',
      DB_NAME: process.env.DB_NAME,
    });
    console.log(`found_items Table created successfully.`);
  } catch (error) {
    logger.error(`${error.message}`, {
      module: 'foundItemModel.js',
      status: 'Failed',
      action: 'Create Table',
      statusCode: 500,
      tableName: 'found_items',
      DB_NAME: process.env.DB_NAME,
    });
    console.error('Unable to create table:', error);
  }
})();

module.exports = FoundItemModel;
