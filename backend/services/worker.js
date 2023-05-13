const cron = require('node-cron');
const {Worker} = require('worker_threads');
const path = require('path');
// const activateSubscriptionsWorker = require('./activateSubscriptionsWorker.js');

const {task1} = require('./activateSubscriptionsWorker');
const {
  manageSubscriptionTask,
} = require('./manageSubscriptionsWorker');

const startWorker = () => {
  const activateSubWorkerPath = path.resolve(
    __dirname,
    './activateSubscriptionsWorker.js',
  );
  const manageSubWorkerPath = path.resolve(
    __dirname,
    './manageSubscriptionsWorker.js',
  );

  const worker = new Worker(activateSubWorkerPath);
  const worker2 = new Worker(manageSubWorkerPath);

  worker.on('message', message => {
    console.log(`Worker thread received message: ${message}`);
  });

  console.log(worker);

  worker.on('error', error => {
    console.error(`Worker thread error: ${error}`);
  });

  worker.on('exit', code => {
    console.log(`Worker thread exited with code ${code}`);
  });

  worker.postMessage('start');
  //   ===================================================================
  worker2.on('message', message => {
    console.log(`Worker2 thread received message: ${message}`);
  });

  worker2.on('error', error => {
    console.error(`Worker2 thread error: ${error}`);
  });

  worker2.on('exit', code => {
    console.log(`Worker2 thread exited with code ${code}`);
  });

  worker2.postMessage('start');
};
module.exports = {startWorker};
