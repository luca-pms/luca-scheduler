require('dotenv').config()
const dayjs = require('dayjs')
const schedule = require('node-schedule')
const logger = require('./logger')
const actions = require('./db/actions')

process.on('SIGINT', () => {
  schedule.gracefulShutdown().then(() => process.exit(0))
})

logger.info('Connected: ' + dayjs().format())

function doTask() {
  actions
    .fetchExpiringRentalAgreements()
    .then((rows) => {
      try {
        rows.forEach(async (rentalAgreement) =>
          actions.updateStatus(rentalAgreement.id)
        )
      } catch (err) {
        logger.error(err)
      }
    })
    .catch((err) => logger.error(err))
}

// execute task every day at 12:01 AM
const job = schedule.scheduleJob('0 1 0 * * *', doTask)
