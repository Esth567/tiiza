const { verify } = require("jsonwebtoken")
const { InitiateConversationCtrl, getConversationCtrl, sendMessageCtrl, fetchMessageCtrl } = require("../controllers")
const VerifyUser = require("../../middleware/auth")

const router = require("express").Router()



router.post("/customer/create/conversation", VerifyUser.ensureAuthenticated, InitiateConversationCtrl)
router.get("/customer/fetch/conversations", VerifyUser.ensureAuthenticated, getConversationCtrl)
router.post("/customer/send/message", VerifyUser.ensureAuthenticated, sendMessageCtrl)
router.get("/customer/fetch/messages", VerifyUser.ensureAuthenticated, fetchMessageCtrl)



module.exports = router