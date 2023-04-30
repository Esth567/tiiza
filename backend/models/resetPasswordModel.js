const {Sequelize, DataTypes, Model} = require('sequelize');
const {sequelize} = require('../db/connect');
const {logger} = require('../utils/winstonLogger');
require('dotenv').config();

class ResetPasswordModel extends Model {}
ResetPasswordModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {sequelize, modelName: 'resetPassword'},
);

(async () => {
  try {
    await sequelize.sync({force: false});
    logger.info(`Successfully created resetPasswords table`, {
      module: 'resetPasswordModel.js',
      status: 'Created',
      action: 'Create Table',
      statusCode: 200,
      tableName: 'resetPasswords',
      DB_NAME: process.env.DB_NAME,
    });
    console.log('Table created successfully.');
  } catch (error) {
    logger.error(`${error.message}`, {
      module: 'resetPasswordModel.js',
      status: 'Failed',
      action: 'Create Table',
      statusCode: 500,
      tableName: 'resetPasswords',
      DB_NAME: process.env.DB_NAME,
    });
    console.error('Unable to create table:', error);
  }
})();

// console.log(UserModel);
module.exports = ResetPasswordModel;
