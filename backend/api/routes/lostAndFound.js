const router = require('express').Router();
const VerifyUser = require('../../middleware/auth');
const LostItemModel = require('../../models/lostItemModel');
const {
  initiateMediaTransfer,
  InitiateUpload,
} = require('../../services/multerConfig');

const {
  lostItemCtrl,
  fetchLostItemsCtrl,
  fetchCustomerLostItemsCtrl,
  foundLostItemCtrl,
  fetchFoundItemsCtrl,
  fetchCustomerFoundItemsCtrl,
} = require('../controllers');

router.get(
  '/fetch/lost-items',
  VerifyUser.ensureAuthenticated,
  fetchLostItemsCtrl,
);
router.get(
  '/fetch/found-items',
  VerifyUser.ensureAuthenticated,
  fetchFoundItemsCtrl,
);
router.get(
  '/fetch/customer/lost-items',
  VerifyUser.ensureAuthenticated,
  fetchCustomerLostItemsCtrl,
);
router.get(
  '/fetch/customer/found-items',
  VerifyUser.ensureAuthenticated,
  fetchCustomerFoundItemsCtrl,
);
router.post(
  '/customer/register/found-items',
  VerifyUser.ensureAuthenticated,
  (req, res, next) => {
    initiateMediaTransfer(req, res, next, 'lost_and_found', 'found');
  },
  foundLostItemCtrl,
);

router.post(
  '/customer/register/lost-item',
  VerifyUser.ensureAuthenticated,
  (req, res, next) => {
    initiateMediaTransfer(req, res, next, 'lost_and_found', 'lost');
  },
  lostItemCtrl,
);

module.exports = router;
