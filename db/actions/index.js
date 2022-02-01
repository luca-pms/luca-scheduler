const dayjs = require('dayjs')
const db = require('../index')

async function fetchExpiringRentalAgreements() {
  const text = `SELECT id FROM rental_agreements WHERE "to" = $1`
  const params = [dayjs().date(29).format('YYYY-MM-DD')]
  const result = await db.query(text, params)
  return result.rows
}

async function updateStatus(id) {
  console.log(id)
  const text = `UPDATE rental_agreements SET is_active = $1 WHERE id = $2`
  const params = [false, id]
  await db.query(text, params)
}

module.exports = {
  fetchExpiringRentalAgreements,
  updateStatus,
}
