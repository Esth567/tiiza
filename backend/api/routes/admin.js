const router = require('express').Router();

const VerifyUser = require('../../middleware/auth');
const {
  adminFetchSubscriptionCtrl,
  adminFetchFoundItemsCtrl,
  adminFetchUsersCtrl,
  adminFetchLostItemsCtrl,
  adminCreateUserCtrl,
  adminUpdateItemCtrl,
  updatePasswordCtrl,
  adminFetchActivities,
  adminFetchPayments,
  qrCodeOrderCtrl,
} = require('../controllers');
const { fetchLostItemsCtrl, fetchQRCodeOrdersCtrl } = require('../controllers');
router.get(
  '/admin/fetch/users',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isAdmin,
  adminFetchUsersCtrl
);
router.get(
  '/admin/fetch/lost-items',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isAdmin,
  adminFetchLostItemsCtrl
);
router.get(
  '/admin/fetch/found-items',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isAdmin,
  adminFetchFoundItemsCtrl
);
router.get(
  '/admin/fetch/payments',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isAdmin,
  adminFetchPayments
);
router.get(
  '/admin/fetch/activities',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isAdmin,
  adminFetchActivities
);
router.get(
  '/admin/fetch/subscriptions',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isAdmin,
  adminFetchSubscriptionCtrl
);
router.patch(
  '/admin/update/item',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isAdmin,
  adminUpdateItemCtrl
);
router.post(
  '/admin/create-user',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isAdmin,
  adminCreateUserCtrl
);
router.patch(
  '/admin/update-password',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isAdmin,
  updatePasswordCtrl
);
router.get(
  '/admin/fetch/qrcode-orders',
  VerifyUser.ensureAuthenticated,
  VerifyUser.isAdmin,
  fetchQRCodeOrdersCtrl
);

module.exports = router;
