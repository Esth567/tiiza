const {
  pollPaymentStatus,
} = require('../../utils/transactionVerificationJob');
const {CardPaymentValidator} = require('../../validation/validation');
const {createCustomError} = require('../../middleware/customError');
const asyncWrapper = require('../../middleware/asyncWrapper');
const {generateUniqueId} = require('../../utils/uniqueIds');
const flw = require('../../services/flutterwaveConfig');
const {
  formatCurrency,
  formatDate,
} = require('../../utils/formatters');
const {receiptGenerator} = require('../../utils/receiptGenerator');
const SubscriptionModel = require('../../models/subscriptionModel');
const TransactionLogModel = require('../../models/TransactionLoggerModel');
const {
  errorLogger,
  logPendingTransaction,
} = require('../../utils/fileLogger');
const {logger} = require('../../utils/winstonLogger');
const {createSubscription} = require('../../utils/createSubRecord');
const LostItemModel = require('../../models/lostItemModel');
const {createLostItem} = require('../../utils/createLostItem');
const {moveFile} = require('../../utils/moveFile');
require('dotenv').config();
// ************************ ENV VARIABLE INITIALIZATION ***********************
const TIIZA_MINOR = process.env.TIIZA_MINOR;
const TIIZA_REAL = process.env.TIIZA_REAL;
const TIIZA_REAL_PLUS = process.env.TIIZA_REAL_PLUS;
const TIIZA_LITE = process.env.TIIZA_LITE;
const TIIZA_LITE_PLUS = process.env.TIIZA_LITE_PLUS;
const TIIZA_PREMIUM_DURATION = process.env.TIIZA_PREMIUM_DURATION;
const TIIZA_MINOR_DURATION = process.env.TIIZA_MINOR_DURATION;

// =======================================|| INITIALIZE CARD PAYMENT ||=====================================================
const cardPaymentCtrl = asyncWrapper(async (req, res, next) => {
  const requestId = res.getHeader('X-request-Id');
  let {subscriptionAmount: amount} = req.session.lostItemDetails;

  const loggedInUser = req.user?.user_id;
  const envVar = process.env;
  let {
    card_number,
    cvv,
    email,
    expiry_month,
    expiry_year,
    // amount,
    currency,
    phone_number,
    fullname,
    subscription_name,
  } = req.body;
  // currency must be in NGN

  const validateData = {
    card_number,
    cvv,
    expiry_month,
    expiry_year,
    amount,
    email,
    amount,
    phone_number,
    fullname,
  };
  // validation

  const {error} = new CardPaymentValidator(validateData).validate();
  // get payload from req body
  const payload = {
    card_number,
    cvv,
    email,
    expiry_month,
    expiry_year,
    amount,
    currency,
    phone_number,
    fullname,
  };
  if (error) return next(createCustomError(error.message, 400));

  // generate universal unique code
  const uniqueString = generateUniqueId();

  // cache details
  payload.enckey = envVar.FLW_ENCRYPTION_KEY;
  payload.tx_ref = `TX-${uniqueString}`;
  // first charge card api call

  const response = await flw.Charge.card(payload);

  // validate error
  if (response?.status === 'error') {
    return res.status(400).send({success: false, payload: response});
  } else if (response?.status === 'success') {
    if (response.meta.authorization.mode === 'pin') {
      req.session.charge_payload = payload;
      req.session.custom_payload = {};
      req.session.custom_payload.lostItemDetails =
        req.session.lostItemDetails;
      req.session.charge_payload.authorization = {
        mode: 'pin',
      };

      amount = parseFloat(payload.amount);
      // get charge
      const flwPercentage = parseFloat(
        process.env.FLW_CARD_PERCENTAGE_CHARGE,
      );
      const stampDuty =
        amount >= 10000 ? parseFloat(process.env.STAMP_DUTY) : 0; //checks if amount is above 10k
      const percentageCharge = flwPercentage * amount; //calc %charge
      const commission = percentageCharge + stampDuty;
      const totalCharge = commission + amount;
      // req.session.charge_payload.toReceive = payload.amount; //amt to get
      // cache values
      req.session.custom_payload.authUrl =
        "/api/v1/flw/payment/card-payment/authorization'";
      req.session.custom_payload.totalDebit = totalCharge; //total debit
      req.session.custom_payload.commission = commission;
      // req.session.charge_payload.toReceive = amount;
      req.session.custom_payload.subscription_name =
        subscription_name;

      return res.status(200).send({
        success: true,
        payload: {
          ...req.session.charge_payload,
          ...req.session.custom_payload,
          ...req.session.lostItemDetails,
        },
      });
    } else {
      logger.error(
        'Failed to Complete Transaction: Reason: Card type is not supported.',
        {
          module: 'cardPaymentController.js',
          userId: req.user ? req.user.user_id : null,
          requestId: requestId,
          method: req.method,
          path: req.path,
          action: 'Card Payment',
          statusCode: 400,
          clientIp: req.clientIp,
        },
      );
      return res.status(400).send({
        success: 'false',
        payload:
          'Sorry Your card is not supported for this service.please try another card.',
      });
    }
  } else {
    return res.status(400).send({
      success: false,
      payload: 'Sorry, Something went wrong!',
    });
  }
  // Authorizing transactions
});

/**
 * ===============================================================|| THIS CTRL VALIDATES CARD TRANSACTION WITH PIN ||===================================================================================
 */

const cardAuthorizationCtrl = asyncWrapper(async (req, res, next) => {
  const requestId = res.getHeader('X-request-Id');

  const {user_id, phone, email} = req.user;
  const payload = req.session.charge_payload;
  const custom_payload = req.session.custom_payload;
  if (
    Object.keys(payload).length === 0 ||
    Object.keys(custom_payload).length === 0
  )
    return next(
      createCustomError(
        'sorry,You do not have the necessary information to access this resource',
        403,
      ),
    );

  payload.authorization.pin = req.body.pin;
  const response = await flw.Charge.card(payload);

  // return res.send({ response });
  switch (response?.meta?.authorization?.mode) {
    case 'otp':
      // Show the user a form to enter the OTP
      req.session.charge_payload.flw_ref = response.data.flw_ref;
      req.session.custom_payload.validationUrl =
        '/flw/payment/card-payment/validation';
      return res.status(200).send({
        success: true,
        payload:
          'Pin Authorization complete.OTP has been sent to your phone number.Please use it to authenticate your payment.',
      });
    // return res.redirect('/api/v1/payment/card_payment/validation');
    case 'redirect':
      const authUrl = response.meta.authorization.redirect;
      // todo:
      return res.redirect(authUrl);
    default:
      // No validation needed; just verify the payment

      //
      const transactionId = response?.data?.id;
      const transaction = await flw.Transaction.verify({
        id: transactionId,
      });
      if (transaction.data.status == 'successful') {
        //
        const txInfo = transaction.data;
        const commission = parseFloat(
          req.session.custom_payload.commission,
        );
        const subName = req.session.custom_payload.subscription_name;

        const isLogged = await TransactionLogModel.create({
          customer_id: user_id,
          transaction_type: response.data.narration,
          transaction_ref: response.data.tx_ref,
          amount: response.data.amount,
          transaction_code: response.data.id,
          customer_name: response.data.customer.name,
          currency: response.data.currency,
          charged: payload.commission,
          subscription_name:
            custom_payload.lostItemDetails.subscriptionName,
          status: response.data.status,
        });

        if (!isLogged) {
          logger.error(
            `Failed to create Transaction record. | Amount ${formatCurrency(
              amount,
            )} | Transaction refrence: ${
              response.data.tx_ref
            } | Transaction code: ${response.data.id} `,
            {
              module: 'cardPaymentController.js',
              userId: req.user ? req.user.user_id : null,
              requestId: requestId,
              method: req.method,
              path: req.path,
              action: 'Save Subscription Record',
              statusCode: 500,
              clientIp: req.clientIp,
            },
          );

          return next(
            createCustomError(
              'System is unable to complete transaction, please wait for a few minutes, check your balance before you try again',
              500,
            ),
          );
        }

        const itemInfo = custom_payload.lostItemDetails;
        itemInfo.lost_date = new Date(itemInfo.lost_date);
        itemInfo.customer_email = email;
        itemInfo.is_approved = false;

        const storedLostInfo = await createLostItem(
          req,
          res,
          next,
          itemInfo,
        );
        if (storedLostInfo === null) {
          logger.error('Failed to register Lost Item in Database', {
            module: 'lostAndFoundController.js',
            userId: req.user ? req.user.user_id : null,
            requestId: requestId,
            method: req.method,
            path: req.path,
            action: 'Save Lost Item ',
            statusCode: 500,
            clientIp: req.clientIp,
          });
          return res.status(500).send({
            success: false,
            payload: 'Sorry,Something went wrong',
          });
        }

        const isSubscribed = await createSubscription({
          subName,
          item_id: storedLostInfo.item_id,
          duration: TIIZA_PREMIUM_DURATION,
          startDate: null,
          endDate: null,
          customer_id: user_id,
        });

        if (!isSubscribed) {
          logger.error(
            `Failed to create Subscription record.| Amount ${formatCurrency(
              amount,
            )} | Subscription duration:${TIIZA_PREMIUM_DURATION} | Subscription Name ${subName} `,
            {
              module: 'cardPaymentController.js',
              userId: req.user ? req.user.user_id : null,
              requestId: requestId,
              method: req.method,
              path: req.path,
              action: 'Create Subscription',
              statusCode: 500,
              clientIp: req.clientIp,
            },
          );

          return next(
            createCustomError(
              'System is unable to create subscription.Please contact support Team',
              500,
            ),
          );
        }
        moveFile(req, res, next);

        req.session.charge_payload = {};
        req.session.custom_payload = {};

        return res.status(200).send({
          success: true,
          payload: receiptGenerator(
            'Card Payment',
            txInfo.amount,
            txInfo.tx_ref,
            `${custom_payload.lostItemDetails.subscriptionName} Subscription`,
            txInfo.status,
            new Date(),
          ),
          message:
            'Thank you for submitting your report. We have received it and will publish it once it has been approve',
        });
      } else if (transaction.data.status == 'pending') {
        // LOG TO FILE
        logger.info(
          `Pending Card Transaction. | Amount: ${formatCurrency(
            amount,
          )}  | Transaction ref ${
            req.session.charge_payload.tx_ref
          } | Status: Pending | Amount: ${
            req.session.charge_payload.amount
          }`,
          {
            module: 'cardPaymentController.js',
            userId: req.user ? req.user.user_id : null,
            requestId: requestId,
            method: req.method,
            path: req.path,
            action: 'Card Payment',
            statusCode: 400,
            clientIp: req.clientIp,
          },
        );

        const intervalId = setInterval(() => {
          const paymentId = transactionId;
          pollPaymentStatus(paymentId, intervalId);
        }, 600000); //10 mins
        setTimeout(() => {
          clearInterval(intervalId);
        }, 14400000); // Stop after 4 hours (4 * 60 * 60 * 1000 = 14400000 ms)
        return res
          .status(200)
          .send({success: false, payload: transaction});
      } else {
        // LOG TO FILE
        logger.error(
          `Failed Card Transaction ${formatCurrency(
            amount,
          )}  | Transaction ref ${
            req.session.charge_payload.tx_ref
          } | Status: Failed | Amount: ${
            req.session.charge_payload.amount
          }`,
          {
            module: 'cardPaymentController.js',
            userId: req.user ? req.user.user_id : null,
            requestId: requestId,
            method: req.method,
            path: req.path,
            action: 'Card Payment',
            statusCode: 400,
            clientIp: req.clientIp,
          },
        );

        return res.status(500).send({
          success: false,
          payload: 'Sorry your payment cannot be completed',
        });
      }
  }
});

//=================================|| VALIDATES CARD TRANSACTION WITH OTP ||====================================================

const validateCardTransactionCtrl = asyncWrapper(
  async (req, res, next) => {
    const requestId = res.getHeader('X-request-Id');

    const {user_id, phone, email} = req.user;

    const requestPayload = req.session.charge_payload;
    const custom_payload = req.session.custom_payload;

    if (
      Object.keys(requestPayload).length === 0 ||
      Object.keys(custom_payload).length === 0
    )
      return next(
        createCustomError(
          'sorry,You do not have the necessary information to access this resource',
          403,
        ),
      );

    const otp = req.body.otp;
    if (!otp)
      return next(
        createCustomError('OTP field must not be empty', 400),
      );
    // VALIDATE OTP
    const response = await flw.Charge.validate({
      otp: otp,
      flw_ref: req.session.charge_payload.flw_ref,
    });

    if (
      response?.data?.status === 'successful' ||
      response?.data?.status === 'pending'
    ) {
      // Verify the payment
      const transactionId = response?.data?.id.toString();
      const transaction = await flw.Transaction.verify({
        id: transactionId,
      });
      if (transaction.data.status === 'error') {
        logger.error(`${response.message}`, {
          module: 'cardPaymentController.js',
          userId: req.user ? req.user.user_id : null,
          requestId: requestId,
          method: req.method,
          path: req.path,
          action: 'Card Payment',
          statusCode: 400,
          clientIp: req.clientIp,
        });

        return res
          .status(400)
          .send({success: false, payload: response.message});
      }
      if (transaction.data.status == 'successful') {
        response.tx_redirect = '/api/v1/payment-successful';
        const txInfo = transaction.data;

        const commission = parseFloat(
          req.session.custom_payload.commission,
        );
        const subName =
          req.session.custom_payload?.lostItemDetails
            .subscriptionName;
        // return
        const isLogged = await TransactionLogModel.create({
          customer_id: user_id,
          transaction_type: txInfo.narration,
          transaction_ref: txInfo.tx_ref,
          amount: txInfo.amount,
          transaction_code: txInfo.id,
          customer_name: txInfo.customer.name,
          currency: txInfo.currency,
          charged: commission,
          subscription_name: subName,
          status: txInfo.status,
        });

        if (!isLogged) {
          logger.error(
            `Failed to create  transaction record |  Amount:  ${formatCurrency(
              txInfo.amount,
            )}. Transaction reference:${
              txInfo.tx_ref
            }, Transaction code ${txInfo.id}`,
            {
              module: 'cardPaymentController.js',
              userId: req.user ? req.user.user_id : null,
              requestId: requestId,
              method: req.method,
              path: req.path,
              action: 'Card Payment',
              statusCode: 500,
              clientIp: req.clientIp,
            },
          );

          return next(
            createCustomError(
              'System is unable to complete transaction, please wait for a few minutes, check your balance before you try again',
              500,
            ),
          );
        }
        // create item

        const itemInfo = custom_payload.lostItemDetails;
        itemInfo.lost_date = new Date(itemInfo.lost_date);
        itemInfo.customer_email = email;
        itemInfo.is_approved = false;

        // console.log(...itemInfo);
        const storedLostInfo = await createLostItem(
          req,
          res,
          next,
          itemInfo,
        );

        if (storedLostInfo === null) {
          logger.error('Failed to register Lost Item in Database', {
            module: 'lostAndFoundController.js',
            userId: req.user ? req.user.user_id : null,
            requestId: requestId,
            method: req.method,
            path: req.path,
            action: 'Save Lost Item ',
            statusCode: 500,
            clientIp: req.clientIp,
          });
          return res.status(500).send({
            success: false,
            payload: 'Sorry,Something went wrong',
          });
        }

        // register subscription
        const isSubscribed = await createSubscription({
          subName,
          item_id: storedLostInfo.item_id,
          duration: TIIZA_PREMIUM_DURATION,
          startDate: null,
          endDate: null,
          customer_id: user_id,
        });

        if (!isSubscribed) {
          logger.error(
            `Failed to create  Subscription record |  Amount :  ${formatCurrency(
              txInfo.amount,
            )}. Subscription duration:${TIIZA_PREMIUM_DURATION}, Subscription Name ${subName}`,
            {
              module: 'cardPaymentController.js',
              userId: req.user ? req.user.user_id : null,
              requestId: requestId,
              method: req.method,
              path: req.path,
              action: 'Card Payment',
              statusCode: 500,
              clientIp: req.clientIp,
            },
          );

          return next(
            createCustomError(
              'System is unable to create subscription.Please contact support Team',
              500,
            ),
          );
        }

        logger.info(
          ` Successful Subscription Payment  | Amount :  ${formatCurrency(
            txInfo.amount,
          )}. Subscription duration:${TIIZA_PREMIUM_DURATION} days, Subscription Name ${subName}`,
          {
            module: 'cardPaymentController.js',
            userId: req.user ? req.user.user_id : null,
            requestId: requestId,
            method: req.method,
            path: req.path,
            action: 'Card Payment',
            statusCode: 201,
            clientIp: req.clientIp,
          },
        );
        // move the media file
        await moveFile(req, res, next);

        // if(isMoved ===false ) return res.send("unable to add attachment")

        req.session.charge_payload = {};
        req.session.custom_payload = {};
        return res.status(200).send({
          success: true,
          payload: receiptGenerator(
            'Card Payment',
            txInfo.amount,
            txInfo.tx_ref,
            `${custom_payload.lostItemDetails.subscriptionName} Subscription`,
            txInfo.status,
            new Date(),
          ),
          message:
            'Thank you for submitting your report. We have received it and will publish it once it has been approve',
        });

        // :?check webhook
      } else if (transaction.data.status == 'pending') {
        // LOG TO FILE
        logger.warn(
          `Pending Transaction. |  Amount:${requestPayload.amount} | transaction ref:${requestPayload.tx_ref}`,
          {
            module: 'cardPaymentController.js',
            userId: req.user ? req.user.user_id : null,
            requestId: requestId,
            method: req.method,
            path: req.path,
            action: 'Card Payment',
            statusCode: 500,
            clientIp: req.clientIp,
          },
        );

        // query flw to verify pending transaction
        const intervalId = setInterval(() => {
          const paymentId = transactionId;
          pollPaymentStatus(paymentId, intervalId);
        }, 600000);
        setTimeout(() => {
          clearInterval(intervalId);
        }, 14400000); // Stop after 4 hours (4 * 60 * 60 * 1000 = 14400000 ms)
        // return res.status(200).send({ success: false, payload: transaction });
      }
    }
  },
);

module.exports = {
  cardPaymentCtrl,
  cardAuthorizationCtrl,
  validateCardTransactionCtrl,
};
