const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/connect');
const { logger } = require('../utils/winstonLogger');
require('dotenv').config();
class UserModel extends Model {}
UserModel.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    full_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    user_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2001,
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  { sequelize, modelName: 'user' }
);
(async () => {
  try {
    await sequelize.sync({ force: false });
    logger.info(`Successfully created users table`, {
      module: 'userModel.js',
      status: 'Created',
      action: 'Create Table',
      statusCode: 200,
      tableName: 'users',
      DB_NAME: process.env.DB_NAME,
    });
    console.log('Table created successfully.');
  } catch (error) {
    logger.error(`${error.message}`, {
      module: 'userModel.js',
      status: 'Failed',
      action: 'Create Table',
      statusCode: 500,
      tableName: 'users',
      DB_NAME: process.env.DB_NAME,
    });
    console.error('Unable to create table:', error);
  }
})();

// console.log(UserModel);
module.exports = UserModel;
