const {Sequelize, Op} = require('sequelize');
const SubscriptionModel = require('../models/subscriptionModel');
const {sequelize} = require('../db/connect');
require('dotenv').config();
// const SubscriptionModel = require('../models/subscriptionModel');
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

const manageSubscriptions = async () => {
  console.log('manage subscription');
  try {
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

    console.log(expiredSubscriptions);
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
          const currentEndDate = new Date(subscription.endDate);
          const newEndDate = new Date(
            // subscription.endDate + 1440 * extensionDays * 60 * 1000,
            currentEndDate.getTime() + 3 * 60 * 1000,
          );
          // const now = new Date(subscription.endDate);

          // console.log(new Date(now.getTime() + 30 * 60 * 1000));
          const isUpdated = await SubscriptionModel.update(
            {endDate: newEndDate, is_extended: true},
            {where: {item_id: subscription.item_id}},
          );

          if (!isUpdated)
            return res.status(500).send({
              success: false,
              payload: 'Unable to update record',
            });

          console.log('added extra  min');
        } else if (
          (premiumSubs.includes(subscription.name) &&
            subscription.dataValues.is_extended) ||
          subscription.name === TIIZA_MINOR
        ) {
          console.log(
            `${subscription} overdue subscriptions deleted.`,
          );

          subscription.destroy();
        }
      },
    );
    await Promise.all(promises);
    // await transaction.commit();
  } catch (error) {
    await transaction.rollback();

    console.error('Transaction rolled back:', error);
  }
};

module.exports = manageSubscriptions;
