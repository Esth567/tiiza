const {Sequelize} = require('sequelize');
const SubscriptionModel = require('../models/subscriptionModel');
const cron = require('node-cron');
const {sequelize} = require('../db/connect');
const UserModel = require('../models/userModel');
require('dotenv').config();

const {
  TIIZA_REAL,
  TIIZA_REAL_PLUS,
  TIIZA_LITE,
  TIIZA_LITE_PLUS,
  TIIZA_MINOR,
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

const manageSubscriptions = async () => {
  console.log('run job');
  const expiredSubscriptions = await SubscriptionModel.findAll({
    where: {
      endDate: {
        [Sequelize.Op.lte]: new Date(),
      },
    },
  });

  const promises = expiredSubscriptions.map(async subscription => {
    const premiumSubs = [
      TIIZA_REAL,
      TIIZA_REAL_PLUS,
      TIIZA_LITE,
      TIIZA_LITE_PLUS,
    ];

    console.log(!subscription.dataValues.is_extended, 'test');
    console.log(
      premiumSubs.includes(subscription.name) &&
        !subscription.dataValues.is_extended,
    );
    if (
      premiumSubs.includes(subscription.name) &&
      !subscription.dataValues.is_extended
    ) {
      console.log('loop by passed');
      console.log(subscription.item_id);
      const extensionDays = 7;
      const newEndDate = new Date(
        // subscription.endDate + 1440 * extensionDays * 60 * 1000,
        subscription.endDate + 1 * 60 * 1000,
      );

      const isUpdated = await SubscriptionModel.update(
        {endDate: newEndDate, is_extended: true},
        {where: {item_id: subscription.item_id}},
      );

      console.log(isUpdated);
      if (!isUpdated)
        return res
          .status(500)
          .send({success: false, payload: 'Unable to update record'});

      console.log('added extra 1 min', '');
    } else if (
      (premiumSubs.includes(subscription.name) &&
        subscription.dataValues.is_extended) ||
      subscription.name === TIIZA_MINOR
    ) {
      console.log(`${subscription} overdue subscriptions deleted.`);

      subscription.destroy();
    }
  });
  await Promise.all(promises);
};
cron.schedule('*/20 * * * * *', manageSubscriptions);

module.exports = {checkSubscription};
