const {DataTypes, STRING} = require('sequelize');

const {sequelize} = require('../db/connect');
const UserModel = require('./userModel');
const {logger} = require('../utils/winstonLogger');

const BookingModel = sequelize.define('QRCode_Booking', {
  booking_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: false,
  },
  payment_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
});

BookingModel.belongsTo(UserModel, {foreignKey: 'customer_id'});
UserModel.hasMany(BookingModel, {
  onDelete: 'CASCADE',
  foreignKey: 'customer_id',
});

(async () => {
  try {
    await sequelize.sync({force: false});
    logger.info(`Successfully created QRCode Order table  table`, {
      module: 'bookingModel.js',
      status: 'Created',
      action: 'Create Table',
      statusCode: 200,
      tableName: 'subscriptions',
      DB_NAME: process.env.DB_NAME,
    });
  } catch (error) {
    logger.error(`${error.message}`, {
      module: 'bookingModel.js',
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
  BookingModel,
};
