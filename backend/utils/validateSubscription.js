const SubscriptionModel = require('../models/subscriptionModel');
const UserModel = require('../models/userModel');
require('dotenv').config();

const {
  TIIZA_REAL,
  TIIZA_REAL_PLUS,
  TIIZA_LITE,
  TIIZA_LITE_PLUS,
  TIIZA_MINOR,
  TIIZA_PREMIUM_DURATION,
  TIIZA_MINOR_DURATION,
  MINUTES_PER_DAY,
} = process.env;

const checkSubscription = async req => {
  const {user_id} = req.user;
  const getSubscription = await SubscriptionModel.findOne({
    where: {customer_id: user_id},
    include: [UserModel],
  });
  if (!getSubscription) return false;
  return true;
};

// cron.schedule('*/5 * * * * *', activateSubscriptions);
// cron.schedule('*/5 * * * * *', activateSubscriptions);

module.exports = {checkSubscription};
