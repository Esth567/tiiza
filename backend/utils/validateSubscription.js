const {Sequelize, Op} = require('sequelize');
const SubscriptionModel = require('../models/subscriptionModel');
const cron = require('node-cron');
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

const manageSubscriptions = async () => {
  console.log('run job');

  const expiredSubscriptions = await SubscriptionModel.findAll({
    where: {
      [Op.and]: [
        {
          endDate: {
            [Sequelize.Op.lte]: new Date(),
          },
        },
        {is_confirmed: true},
        {is_active: true},
      ],
    },
  });

  const promises = expiredSubscriptions.map(
    async (subscription, idx) => {
      const premiumSubs = [
        TIIZA_REAL,
        TIIZA_REAL_PLUS,
        TIIZA_LITE,
        TIIZA_LITE_PLUS,
      ];

      if (
        premiumSubs.includes(subscription.name) &&
        !subscription.dataValues.is_extended
      ) {
        const extensionDays = 7;
        const newEndDate = new Date(
          // subscription.endDate + 1440 * extensionDays * 60 * 1000,
          subscription.endDate + 2 * 60 * 1000,
        );

        const isUpdated = await SubscriptionModel.update(
          {endDate: newEndDate, is_extended: true},
          {where: {item_id: subscription.item_id}},
        );

        console.log(isUpdated);
        if (!isUpdated)
          return res.status(500).send({
            success: false,
            payload: 'Unable to update record',
          });

        console.log('added extra 1 min', '');
      } else if (
        (premiumSubs.includes(subscription.name) &&
          subscription.dataValues.is_extended) ||
        subscription.name === TIIZA_MINOR
      ) {
        console.log(`${subscription} overdue subscriptions deleted.`);

        subscription.destroy();
      }
    },
  );
  await Promise.all(promises);
};
cron.schedule('*/20 * * * * *', manageSubscriptions);

const activateSubscriptions = async () => {
  console.log('activate subscription job');
  const pendingSubscriptions = await SubscriptionModel.findAll({
    where: {
      [Op.and]: [{is_confirmed: true}, {is_active: false}],
    },
  });

  const promises = pendingSubscriptions.map(
    async (subscription, idx) => {
      const duration =
        subscription.name === TIIZA_MINOR
          ? parseInt(TIIZA_MINOR_DURATION)
          : parseInt(TIIZA_PREMIUM_DURATION);

      const minutesPerDay = parseInt(MINUTES_PER_DAY);
      const isUpdated = await SubscriptionModel.update(
        {
          is_active: true,
          startDate: new Date(),
          endDate: new Date(
            Date.now() + minutesPerDay * duration * 60 * 1000,
            // Date.now() + 2 * 60 * 1000,
          ),
        },
        {where: {id: subscription.id}},
      );

      if (!isUpdated[0])
        return res.status(500).send({
          success: false,
          payload: 'Unable to update Subscription record',
        });
    },
  );

  await Promise.all(promises);
};

cron.schedule('*/5 * * * * *', activateSubscriptions);
// cron.schedule('*/5 * * * * *', activateSubscriptions);

module.exports = {checkSubscription};
