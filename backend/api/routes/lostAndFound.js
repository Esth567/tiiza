const router = require('express').Router();
const multer = require('multer');
const VerifyUser = require('../../middleware/auth');
const LostItemModel = require('../../models/lostItemModel');
const SubscriptionModel = require('../../models/subscriptionModel');
const UserModel = require('../../models/userModel');
const { initiateMediaTransfer } = require('../../services/multerConfig');
const { createSubscription } = require('../../utils/createSubRecord');
const { image } = require('../controllers/lostAndFoundController');
const path = require('path');
const {
  lostItemCtrl,
  fetchLostItemsCtrl,
  fetchCustomerLostItemsCtrl,
  foundLostItemCtrl,
  fetchFoundItemsCtrl,
  fetchCustomerFoundItemsCtrl,
  subscriptionCtrl,
} = require('../controllers');

const fs = require('fs');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './tmp');
  },
  filename: (req, file, cb) => {
    const customerEmail = req.user.email;
    cb(null, customerEmail + '_Img' + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get(
  '/fetch/lost-items',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,

  fetchLostItemsCtrl
);
router.get(
  '/fetch/found-items',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,

  fetchFoundItemsCtrl
);
router.get(
  '/customer/fetch/lost-items',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,

  fetchCustomerLostItemsCtrl
);
router.get(
  '/customer/fetch/found-items',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,

  fetchCustomerFoundItemsCtrl
);
router.post(
  '/customer/register/found-items',

  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,

  (req, res, next) => {
    initiateMediaTransfer(req, res, next, 'lost_and_found', 'found');
  },
  foundLostItemCtrl
);

router.post(
  '/customer/register/lost-item',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,
  upload.single('image'),
  lostItemCtrl
);

router.post(
  '/customer/subscription-plan',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isCustomer,
  subscriptionCtrl
);
// router.post('/customer/subscription', async (req, res) => {
//   const u = await LostItemModel.findOne({
//     where: {customer_id: 1},
//     include: {model: SubscriptionModel},
//   });

//   res.send(u);
// });

module.exports = router;
