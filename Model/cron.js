const cron = require('node-cron')

function scheduler(){cron.schedule('*/3 * * * * *', () => {
    console.log('running a task every minute');
  });}

  module.exports = scheduler;