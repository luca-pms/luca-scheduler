const { createLogger, transports, format } = require('winston')
// TODO: Add file rotation

const logger = createLogger({
  level: 'info',
  format: format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.File({ filename: 'logs/error.json', level: 'error' }),
    new transports.File({ filename: 'logs/combined.json' }),
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.json' }),
  ],
})

// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.prettyPrint(),
        format.colorize()
      ),
      handleExceptions: true,
    })
  )
}

module.exports = logger
