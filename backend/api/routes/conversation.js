const {verify} = require('jsonwebtoken');
const {
  InitiateConversationCtrl,
  getConversationCtrl,
  sendMessageCtrl,
  fetchMessageCtrl,
} = require('../controllers');
const VerifyUser = require('../../middleware/auth');

const router = require('express').Router();

router.post(
  '/customer/create/conversation',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,

  InitiateConversationCtrl,
);
router.get(
  '/customer/fetch/conversations',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,

  getConversationCtrl,
);
router.post(
  '/customer/send/message',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,

  sendMessageCtrl,
);
router.get(
  '/customer/fetch/messages/:conversationId',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,

  fetchMessageCtrl,
);

module.exports = router;
