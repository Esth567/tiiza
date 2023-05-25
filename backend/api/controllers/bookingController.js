const asyncWrapper = require('../../middleware/asyncWrapper');
const {createCustomError} = require('../../middleware/customError');
const {BookingModel} = require('../../models/bookingModel');
const UserModel = require('../../models/userModel');

const qrCodeOrderCtrl = asyncWrapper(async (req, res, next) => {
  const {full_name, phone} = req.user;
  const {quantity, amount, address, payment_name} = req.body;

  req.session.paymentPayload = {
    payment_name,
    amount,
    quantity,
    address,
  };
  res.sendStatus(200);
});

const fetchQRCodeOrdersCtrl = asyncWrapper(async (req, res, next) => {
  const qrCodeBookings = await BookingModel.findAll({
    include: {
      model: UserModel,

      attributes: {
        exclude: [
          'password',
          'user_role',
          'createdAt',
          'updatedAt',
          'is_verified',
          'user_id',
        ],
      },
    },
  });

  if (qrCodeBookings.length == 0)
    return next(createCustomError('No Data found', 404));

  return res
    .status(200)
    .json({success: true, payload: qrCodeBookings});
});

module.exports = {qrCodeOrderCtrl, fetchQRCodeOrdersCtrl};
