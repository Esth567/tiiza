

const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/connect');
const UserModel = require('./userModel');
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
            key: "user_id"
        }
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

// TODO:add is verified true or false by KYC:add as a middleware
(async () => {
    try {
        await sequelize.sync({ force: false });
        console.log('Table created successfully.');
    } catch (error) {
        console.error('Unable to create table:', error);
    }
})();

module.exports = SubscriptionModel
