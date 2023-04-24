const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/connect');
const UserModel = require('./userModel');

class TransactionLogModel extends Model { }
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
                key: "user_id"
            }
        },
        transaction_type: {
            type: DataTypes.STRING(45), //debit or credit
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
        subscription_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
    },
    { sequelize, modelName: 'transactionLog' }
);



//
(async () => {
    try {
        await sequelize.sync({ force: false });
        console.log(' TransactionLog Table created successfully.');
    } catch (error) {
        console.error('Unable to create table:', error);
    }
})();

module.exports = TransactionLogModel;
