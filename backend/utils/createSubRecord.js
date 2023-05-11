const SubscriptionModel = require('../models/subscriptionModel');

const createSubscription = async ({
  subName,
  item_id,
  duration,
  startDate,
  endDate,
  customer_id,
}) => {
  const isSubscribed = await SubscriptionModel.create({
    name: subName,
    item_id,
    duration, // in days
    startDate,
    endDate,
    customer_id,
  });

  return isSubscribed;
};

module.exports = {createSubscription};
