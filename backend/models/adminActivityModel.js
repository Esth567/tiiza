const {DataTypes} = require('sequelize');
const {sequelize} = require('../db/connect');
const LostItemModel = require('./lostItemModel');
const {logger} = require('../utils/winstonLogger');
const UserModel = require('./userModel');

const AdminActivityModel = sequelize.define('admin_Activity', {
  activity_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  modified_by: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  item_type: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: true,
  },
});

AdminActivityModel.belongsTo(LostItemModel, {foreignKey: 'item_id'});
AdminActivityModel.belongsTo(UserModel, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
(async () => {
  try {
    await sequelize.sync({force: false});
    logger.info(`Successfully created Admin activity table`, {
      module: 'adminActivityModel.js',
      status: 'Created',
      action: 'Create Table',
      statusCode: 200,
      tableName: 'subscriptions',
      DB_NAME: process.env.DB_NAME,
    });
    console.log('Table created successfully.');
  } catch (error) {
    logger.error(`${error.message}`, {
      module: 'adminActivityModel.js',
      status: 'Failed',
      action: 'Create Table',
      statusCode: 500,
      tableName: 'subscriptions',
      DB_NAME: process.env.DB_NAME,
    });
    console.error('Unable to create table:', error);
  }
})();

module.exports = {
  AdminActivityModel,
};
