const {Sequelize, Op} = require('sequelize');
const SubscriptionModel = require('../models/subscriptionModel');
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

const activateSubscriptions = async () => {
  console.log('activate subscription job');
  const pendingSubscriptions = await SubscriptionModel.findAll({
    where: {
      [Op.and]: [{is_confirmed: true}, {is_active: false}],
    },
  });

  //   console.log(pendingSubscriptions);
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

module.exports = activateSubscriptions;
