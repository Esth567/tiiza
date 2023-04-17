const { Sequelize, DataTypes } = require('sequelize');

const { sequelize } = require('../db/connect');
const UserModel = require('./userModel');

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
});

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log(`found_items Table created successfully.`);
  } catch (error) {
    console.error('Unable to create table:', error);
  }
})();

module.exports = FoundItemModel;