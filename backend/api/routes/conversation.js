const { conversationCtrl, getConversationCtrl, sendMessageCtrl, fetchMessageCtrl } = require("../controllers")

const router = require("express").Router()



router.post("/customer/create/conversation", conversationCtrl)
router.get("/customer/fetch/conversations", getConversationCtrl)
router.post("/customer/send/message", sendMessageCtrl)
router.get("/customer/fetch/messages", fetchMessageCtrl)



module.exports = router