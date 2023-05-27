const { parentPort } = require('worker_threads');
const cron = require('node-cron');
const activateSubscriptions = require('../utils/activateSubscription');

const task1 = cron.schedule('0 * * * * *', async () => {
  try {
    await activateSubscriptions();
  } catch (error) {
    console.log('error message');
    console.log(error.message);
  }
});

module.exports = { task1 };
