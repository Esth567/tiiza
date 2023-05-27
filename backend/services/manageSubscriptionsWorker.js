const { parentPort } = require('worker_threads');
const cron = require('node-cron');

const manageSubscriptions = require('../utils/manageSubscription');

// parentPort.on('message', async message => {
//   if (message === 'start') {
//     await manageSubscriptions();
//     parentPort.postMessage('done');
//   }
// });

const manageSubscriptionTask = cron.schedule('0 * * * * *', async () => {
  try {
    await manageSubscriptions();
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = { manageSubscriptionTask };
