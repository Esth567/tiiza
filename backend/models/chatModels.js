const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../db/connect');
const UserModel = require('./userModel');

const ConversationModel = sequelize.define('Conversation', {
    conversation_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const ConversationMember = sequelize.define('ConversationMember', {
    record_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    member_id: {
      type: DataTypes.INTEGER
    }
  });
  

const MessageModel = sequelize.define('Message', {
    message_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    sender: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

ConversationModel.belongsToMany(ConversationMember, { through: 'ConversationMembers' });
ConversationMember.belongsToMany(ConversationModel, { through: 'ConversationMembers' });


UserModel.hasMany(MessageModel);
MessageModel.belongsTo(UserModel);

UserModel.belongsToMany(ConversationModel, { through: 'UserConversation' });
ConversationModel.belongsToMany(UserModel, { through: 'UserConversation' });

ConversationModel.hasMany(MessageModel);
MessageModel.belongsTo(ConversationModel);



(async () => {
    try {
      await sequelize.sync({ force: false });
      console.log('Table created successfully.');
    } catch (error) {
      console.error('Unable to create table:', error);
    }
  })();

  module.exports = {ConversationModel,MessageModel,ConversationMember}