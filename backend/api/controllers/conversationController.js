const { sequelize } = require("../../db/connect");
const asyncWrapper = require("../../middleware/asyncWrapper");
const { createCustomError } = require("../../middleware/customError");
const { ConversationModel, ConversationMemberModel, MessageModel } = require("../../models/chatModels");
const UserModel = require("../../models/userModel");

const conversationCtrl = asyncWrapper(async (req, res) => {
    const { senderId, receiverId } = req.body;
    // const createConversation = await ConversationModel.create({ title: "default" });

    // const createMember1 = await ConversationMember.create({
    //     member_id: senderId,
    //     conversation_id: createConversation.id,
    // })
    // const createMember2 = await ConversationMember.create({
    //     member_id: reciverId,
    //     conversation_id: createConversation.id,
    // })


    const conversation = await sequelize.transaction(async (t) => {
        const createdConversation = await ConversationModel.create(
            { title: 'default' },
            { transaction: t }
        );

        const members = [
            { member_id: senderId, conversation_id: createdConversation.conversation_id },
            { member_id: receiverId, conversation_id: createdConversation.conversation_id }
        ];
        await ConversationMemberModel.bulkCreate(members, { transaction: t });

        return createdConversation;
    });
    res.send(conversation);
})


const sendMessageCtrl = asyncWrapper(async (req, res, next) => {
    const { user_id } = req.user;
    const { conversationId, sender, text } = req.body;
    const createMessage = await MessageModel.create({
        user_id: sender,
        text,
        conversation_id: conversationId

    })

    // if (createMessage.length == 0) return next(createCustomError("no conversation found", 404))

    return res.status(200).send({ success: true, payload: createMessage })
})
const fetchMessageCtrl = asyncWrapper(async (req, res, next) => {
    const { user_id } = req.user;
    const { conversationId } = req.body;
    const findMessages = await MessageModel.findAll({
        where: {
            conversation_id: conversationId
        }
    })

    if (findMessages.length == 0) return next(createCustomError("no message found", 404))

    return res.status(200).send({ success: true, payload: findMessages })
})




const getConversationCtrl = asyncWrapper(async (req, res, next) => {
    const { user_id } = req.user;

    const findConversations = await ConversationMemberModel.findAll({
        where: { member_id: user_id },
        include: { model: ConversationModel }

    })

    if (findConversations.length == 0) return next(createCustomError("no conversation found", 404))

    return res.status(200).send({ success: true, payload: findConversations })
})


module.exports = { conversationCtrl, getConversationCtrl, sendMessageCtrl, fetchMessageCtrl }