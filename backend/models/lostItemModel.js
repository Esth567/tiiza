const { Sequelize, DataTypes, BOOLEAN } = require('sequelize');

const { sequelize } = require('../db/connect');
const UserModel = require('./userModel');

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
    references: {
      model: UserModel,
      key: 'email',
    },
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  is_approved: {
    type: DataTypes.BOOLEAN,
    default: false,
    allowNull: false,
  }
});

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log(`lostItem Table created successfully.`);
  } catch (error) {
    console.error('Unable to create table:', error);
  }
})();

module.exports = LostItemModel;
