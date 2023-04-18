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
    type: DataTypes.STRING(200),
    allowNull: false
  }
});

const ConversationMemberModel = sequelize.define('ConversationMember', {
  record_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  member_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

// Add a foreign key to ConversationMember model
ConversationMemberModel.belongsTo(ConversationModel, { foreignKey: 'conversation_id' });
ConversationModel.hasMany(ConversationMemberModel, { foreignKey: 'conversation_id' });

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
});

ConversationModel.hasMany(MessageModel, { foreignKey: 'conversation_id' });
MessageModel.belongsTo(ConversationModel, { foreignKey: 'conversation_id' });

UserModel.hasMany(MessageModel, { foreignKey: 'user_id' });
MessageModel.belongsTo(UserModel, { foreignKey: 'user_id' });

UserModel.belongsToMany(ConversationModel, { through: 'UserConversation', foreignKey: 'conversation_id' });
ConversationModel.belongsToMany(UserModel, { through: 'UserConversation', foreignKey: 'user_id' });

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log('Table created successfully.');
  } catch (error) {
    console.error('Unable to create table:', error);
  }
})();

module.exports = { ConversationModel, MessageModel, ConversationMemberModel };
