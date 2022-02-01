const { Pool } = require('pg')
const logger = require('../logger')

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
})

/**
 * An sql query.
 * @param text The sql query text.
 * @param params An array of values to be safely substituted into the sql query text.
 * @returns {*}
 */
async function query(text, params) {
  const start = Date.now()

  // https://node-postgres.com/api/pool#poolquery
  const res = await pool.query(text, params)
  const duration = Date.now() - start

  logger.info('executed query', { text, duration, rows: res.rowCount })

  return res
}

module.exports = {
  query,
}
