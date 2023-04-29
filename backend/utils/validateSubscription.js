const {Sequelize} = require('sequelize');
const SubscriptionModel = require('../models/subscriptionModel');
const cron = require('node-cron');
const {sequelize} = require('../db/connect');

cron.schedule('*/60 * * * * *', async () => {
  // console.log('job');
  const expiredSubscriptions = await SubscriptionModel.findAll({
    where: {
      endDate: {
        [Sequelize.Op.lte]: new Date(),
      },
    },
  });
  // console.log(expiredSubscriptions);
  if (expiredSubscriptions.length > 0) {
    console.log('expiredSubscriptions');
    for (const subscription of expiredSubscriptions) {
      await subscription.destroy();
    }
  }
});

const checkSubscription = async req => {
  const {user_id} = req.user;
  const getSubscription = await SubscriptionModel.findOne({
    where: {customer_id: user_id},
  });
  if (!getSubscription) return false;
  return true;
};

module.exports = {checkSubscription};
