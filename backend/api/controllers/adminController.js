const { HashPassword, UnHashPassword } = require('../../authentication/password');
const asyncWrapper = require('../../middleware/asyncWrapper');
const { createCustomError } = require('../../middleware/customError');
const TransactionLogModel = require('../../models/TransactionLoggerModel');
const { AdminActivityModel } = require('../../models/adminActivityModel');
const SubscriptionModel = require('../../models/subscriptionModel');
const FoundItemModel = require('../../models/foundItemModel');
const LostItemModel = require('../../models/lostItemModel');
const UserModel = require('../../models/userModel');
// const { sendMailOTP } = require('../../utils/sendMailOtp');
const {
  RegisterValidator,
  PasswordValidator,
  ItemUpdateValidator,
} = require('../../validation/validation');
const { sendMail } = require('../../utils/sendMail');
const { itemApprovalTemplate } = require('../../utils/emailTemplates/itemApprovalTemplate');
const { itemRejectionTemplate } = require('../../utils/emailTemplates/itemRejectionTemplate');
const { logger } = require('../../utils/winstonLogger');
// ======================||UPDATE ITEMS ||=============================

const adminUpdateItemCtrl = asyncWrapper(async (req, res, next) => {
  const { user_id, email, full_name } = req.user;
  const requestId = res.getHeader('X-request-Id');

  const { itemId: item_id, itemType, comment, status, customer_email } = req.body;

  const { error } = new ItemUpdateValidator({
    item_id,
    itemType,
    comment,
    status,
  }).validate();

  if (error) return next(createCustomError(error.message, 400));
  const convertStatus = status === 'approve' || status === 'decline' ? `${status}d` : null;

  if (!convertStatus) return next(createCustomError('Please provide a valid action', 400));
  if (itemType === 'lostItem') {
    // check if record already exist in activity table
    const isFound = await AdminActivityModel.findOne({
      where: { item_id, item_type: itemType },
    });

    if (isFound) return next(createCustomError('Sorry,Record already exist', 409));

    const isApproved = await LostItemModel.update(
      { is_approved: convertStatus === 'approved' ? true : false },
      { where: { item_id } }
    );

    if (!isApproved[0])
      return next(createCustomError('Unable to update LostItem.Please try again', 500));
    //

    const createActivityRecord = await AdminActivityModel.create({
      comment,
      modified_by: full_name,
      status: convertStatus,
      item_type: itemType,
      item_id,
      user_id,
    });

    if (!createActivityRecord) {
      return next(
        createCustomError(
          'Unable to create Activity record.Please contact tech team immediately for support.',
          500
        )
      );
    }

    const isSubUpdated = await SubscriptionModel.update(
      { is_confirmed: convertStatus === 'approved' ? true : false },
      { where: { item_id } }
    );

    // if (!isSubUpdated[0])
    //   return next(
    //     createCustomError(
    //       'Unable to update user subscription.Please contact tech team immediately for support.',
    //       500,
    //     ),
    //   );

    // send mail to customer

    if (convertStatus === 'approved') {
      alertCustomer({
        message: 'Item approved and Subscription activated ',
        customer_email,
        callback: itemApprovalTemplate,
        req,
        res,
        next,
      });
    } else {
      alertCustomer({
        message: 'Operation Successful ',
        customer_email,
        callback: itemRejectionTemplate,
        req,
        res,
        next,
      });
    }
  } else if (itemType === 'foundItem') {
    const isFound = await AdminActivityModel.findOne({
      where: { item_id, item_type: itemType },
    });
    if (isFound) return next(createCustomError('Sorry,Record already exist', 409));
    const isApproved = await FoundItemModel.update(
      { is_approved: convertStatus === 'approved' ? true : false },
      { where: { item_id } }
    );

    if (!isApproved[0])
      return next(createCustomError('Unable to update Found item.Please try again', 500));

    const createActivityRecord = await AdminActivityModel.create({
      comment,
      modified_by: full_name,
      status: convertStatus,
      item_type: itemType,
      item_id,
      user_id,
    });
    if (!createActivityRecord) {
      return next(
        createCustomError(
          'Unable to create Activity record.Please contact tech team immediately for support.',
          500
        )
      );
    }

    if (convertStatus === 'approved') {
      alertCustomer({
        message: 'Item approved and Subscription activated ',
        customer_email,
        callback: itemApprovalTemplate,
        req,
        res,
        next,
      });
    } else {
      alertCustomer({
        message: 'Operation Successful ',
        customer_email,
        callback: itemRejectionTemplate,
        req,
        res,
        next,
      });
    }
  } else {
    return next(createCustomError('Invalid Item', 400));
  }
});
// ======================||FETCH CUSTOMERS ||=============================

const adminFetchCustomersCtrl = asyncWrapper(async (req, res, next) => {
  const customers = await UserModel.findAll({
    exclude: ['password', 'user_role', 'user_id'],
  });

  if (customers.length == 0) return next(createCustomError('No customer found', 404));

  res.status(200).json({ success: true, payload: customers });
});
// ======================||SUBSCRIPTIONS ||=============================
const adminFetchSubscriptionCtrl = asyncWrapper(async (req, res, next) => {
  const subscriptions = await SubscriptionModel.findAll();

  if (subscriptions.length == 0) return next(createCustomError('No customer found', 404));

  res.status(200).json({ success: true, payload: subscriptions });
});
// ======================||FETCH LOST ITEMS ||=============================

const adminFetchLostItemsCtrl = asyncWrapper(async (req, res, next) => {
  const lostItems = await LostItemModel.findAll();

  if (lostItems.length == 0) return next(createCustomError('No customer found', 404));

  res.status(200).json({ success: true, payload: lostItems });
});
const adminFetchFoundItemsCtrl = asyncWrapper(async (req, res, next) => {
  const lostItems = await FoundItemModel.findAll();
  if (lostItems.length == 0) return next(createCustomError('No customer found', 404));

  res.status(200).json({ success: true, payload: lostItems });
});

// ======================||CREATE ADMIN ||=============================

const adminCreateUserCtrl = asyncWrapper(async (req, res, next) => {
  const { fullName, email, phone, password, confirmPassword, location } = req.body;
  const validateData = { email, fullName, phone, password, location };

  const { error } = new RegisterValidator(validateData).checkValidation();
  if (error) return res.status(200).json({ success: false, payload: error.message });

  if (password !== confirmPassword)
    return next(createCustomError('The passwords entered do not match. ', 400));
  const findEmail = await UserModel.findOne({
    where: {
      email,
    },
  });

  const full_name = fullName;
  if (findEmail)
    return next(
      createCustomError('Sorry You cannot use this email address.Please try another one', 409)
    );
  const isPhoneFound = await UserModel.findOne({
    where: { phone: phone },
  });
  if (isPhoneFound)
    return next(
      createCustomError(
        'Sorry, Phone number already exist in our system. please try another one',
        409
      )
    );
  const hashPassword = await new HashPassword(password).hash();
  if (!hashPassword) {
    logger.error(`Failed to hash password`, {
      module: 'registerController.js',
      userId: req.user ? req.user.user_id : null,
      requestId: requestId,
      method: req.method,
      path: req.path,
      action: 'Hash password',
      statusCode: 500,
      clientIp: req.clientIp,
    });
    return next(createCustomError('Sorry!, Something went wrong.Please try again later', 500));
  }
  req.session.user_details = {
    password: hashPassword,
    email,
    phone,
    full_name,
    location,
    user_role: 2003,
  };

  const options = {
    companyName: process.env.COMPANY_NAME,
    homeUrl: process.env.DOMAIN_NAME,
    currentYear: new Date().getFullYear(),
    itemName: 'placeholder',
    emailTitle: '',
    email,
    req,
  };
  sendMail(options)
    .then((response) => {
      return res.status(200).json({
        success: true,
        payload: {
          message: `OTP has been sent to ${email}`,
          authUrl: '/validate-otp',
        },
      });
    })
    .catch((error) => {
      logger.error(`${error.message}`, {
        module: 'adminController.js',
        userId: req.user ? req.user.user_id : null,
        requestId: requestId,
        action: 'Send mail OTP',
        method: req.method,
        path: req.path,
        statusCode: 500,
        clientIp: req.clientIp,
      });
      return next(
        createCustomError('System is unable to sent Otp to your Mail. please try again later', 500)
      );
    });
});

// =======================================|| UPDATE PASSWORD CTRL ||====================================================

const updatePasswordCtrl = asyncWrapper(async (req, res, next) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const { email } = req.user;
  const loggedInUser = await UserModel.findOne({ where: { email } });

  const { error } = new PasswordValidator({
    password: oldPassword,
  }).validate();
  if (error) return next(createCustomError(error.message, 400));
  // compare password
  const isMatch = await new UnHashPassword(oldPassword, loggedInUser.dataValues.password).compare();

  if (!isMatch) return next(createCustomError('Incorrect Password', 409));
  // validate new passwords
  const { error: error2 } = new PasswordValidator({
    password: newPassword,
  }).validate();

  if (error2) return next(createCustomError(error2.message, 400));
  // compare new password
  if (newPassword !== confirmPassword)
    return next(createCustomError('New password do not match', 409));
  // hash password
  const hashedPassword = await new HashPassword(newPassword).hash();
  if (!hashedPassword)
    return next(createCustomError('Sorry!, Something went wrong.Please try again', 500));

  const isUpdated = await UserModel.update({ password: hashedPassword }, { where: { email } });
  if (!isUpdated[0]) return next(createCustomError('System is unable to update password', 500));

  return res.status(200).json({ success: true, payload: 'Password updated successfully' });
});

const adminFetchPayments = asyncWrapper(async (req, res, next) => {
  const payments = await TransactionLogModel.findAll();

  if (payments.length === 0) return next(createCustomError('No payment found', 404));

  return res.status(200).json({ success: true, payload: payments });
});
const adminFetchActivities = asyncWrapper(async (req, res, next) => {
  const activities = await AdminActivityModel.findAll();

  if (activities.length === 0) return next(createCustomError('No payment found', 404));

  return res.status(200).json({ success: true, payload: activities });
});
module.exports = {
  adminFetchCustomersCtrl,
  adminFetchFoundItemsCtrl,
  adminFetchLostItemsCtrl,
  adminFetchSubscriptionCtrl,
  adminCreateUserCtrl,
  adminUpdateItemCtrl,
  updatePasswordCtrl,
  adminFetchActivities,
  adminFetchPayments,
};

const alertCustomer = ({ message, customer_email, callback, req, res, next }) => {
  const requestId = res.getHeader('X-request-Id');

  const options = {
    companyName: process.env.COMPANY_NAME,
    homeUrl: process.env.DOMAIN_NAME,
    currentYear: new Date().getFullYear(),
    itemName: 'placeholder',
    customerName: req.user.full_name,
    emailTitle: 'TIIZA:Item confirmation',
    email: customer_email,
  };

  sendMail(options, callback)
    .then((response) => {
      return res.status(200).json({
        success: true,
        payload: `${message}.Mail has been sent to: ${customer_email}`,
      });
    })
    .catch((error) => {
      console.log(error);
      logger.error(`${error.message}`, {
        module: 'adminController.js',
        userId: req.user ? req.user.user_id : null,
        requestId: requestId,
        action: 'Send Item confirmation mail ',
        method: req.method,
        path: req.path,
        statusCode: 500,
        clientIp: req.clientIp,
      });
      return res.status(500).send({
        success: false,
        payload: `${message}. But System was unable to send Mail to customer`,
      });
    });

  // -----------------------
};
