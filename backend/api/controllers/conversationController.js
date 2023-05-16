const {sequelize} = require('../../db/connect');
const asyncWrapper = require('../../middleware/asyncWrapper');
const {createCustomError} = require('../../middleware/customError');
const {
  ConversationModel,
  ConversationMemberModel,
  MessageModel,
  UserConversationModel,
} = require('../../models/chatModels');
const UserModel = require('../../models/userModel');

//========================================================== || INITIATE CONVERSATION CTRL  || ===================================================================

const InitiateConversationCtrl = asyncWrapper(async (req, res) => {
  const {senderId, receiverId} = req.body;
  console.log(senderId);
  const conversation = await sequelize.transaction(async t => {
    const createdConversation = await ConversationModel.create(
      {title: 'default'},
      {transaction: t},
    );

    const members = [
      {
        member_id: senderId,
        conversation_id: createdConversation.conversation_id,
      },
      {
        member_id: receiverId,
        conversation_id: createdConversation.conversation_id,
      },
    ];

    await ConversationMemberModel.bulkCreate(members, {
      transaction: t,
    });

    const userConversations = [
      {
        user_id: senderId,
        conversation_id: createdConversation.conversation_id,
      },
      {
        user_id: receiverId,
        conversation_id: createdConversation.conversation_id,
      },
    ];
    await UserConversationModel.bulkCreate(userConversations, {
      transaction: t,
    });

    return createdConversation;
  });
  return res.status(200).send({success: true, payload: conversation});
});

//========================================================== || SEND MSG CTRL  || ===================================================================

const sendMessageCtrl = asyncWrapper(async (req, res, next) => {
  const {user_id} = req.user;

  const {conversationId, sender, text} = req.body;

  if (!text)
    return next(
      createCustomError('Message field cannot be empty', 400),
    );
  if (!conversationId || !sender)
    return next(
      createCustomError(
        'Please provide all necessary information',
        400,
      ),
    );

  const createMessage = await MessageModel.create({
    user_id: sender,
    text,
    conversation_id: conversationId,
  });

  // if (createMessage.length == 0) return next(createCustomError("no conversation found", 404))

  return res
    .status(200)
    .send({success: true, payload: createMessage});
});
//========================================================== || FETCH MSG CTRL  || ===================================================================

const fetchMessageCtrl = asyncWrapper(async (req, res, next) => {
  const {user_id} = req.user;
  const {conversationId} = req.params;
  const findMessages = await MessageModel.findAll({
    where: {
      conversation_id: conversationId,
    },
  });

  if (findMessages.length == 0)
    return next(createCustomError('no message found', 404));

  return res.status(200).send({success: true, payload: findMessages});
});

//========================================================== || GET CONVERSATION CTRL  || ===================================================================

const getConversationCtrl = asyncWrapper(async (req, res, next) => {
  const {user_id} = req.user;

  const findConversations = await ConversationMemberModel.findAll({
    where: {member_id: user_id},
    include: {model: ConversationModel},
  });

  if (findConversations.length == 0)
    return next(createCustomError('no conversation found', 404));

  return res
    .status(200)
    .send({success: true, payload: findConversations});
});

module.exports = {
  InitiateConversationCtrl,
  getConversationCtrl,
  fetchMessageCtrl,
  sendMessageCtrl,
};
