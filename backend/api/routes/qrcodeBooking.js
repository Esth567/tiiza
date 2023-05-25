const router = require('express').Router();
const {
  qrCodeOrderCtrl,
  fetchQRCodeOrdersCtrl,
} = require('../controllers');

router.post('/customer/book-qrcode', qrCodeOrderCtrl);
// router.post('/customer/book-qrcode', qrCodeOrderCtrl);

module.exports = router;
