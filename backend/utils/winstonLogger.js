const {createLogger, format, transports} = require('winston');
const path = require('path');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    format.errors({stack: true}),
    format.splat(),
    format.json(),
  ),
  defaultMeta: {service: 'tiiza-app'},
  transports: [
    new transports.Console({
      format: format.combine(
        format.printf(
          ({
            timestamp,
            level,
            message,
            label,
            userId,
            ip,
            errorType,
            action,
            errorSource,
            statusCode,
          }) => {
            return `${timestamp} [${label}] ${level.toUpperCase()}: ${message} (user:${userId}, errorType:${errorType}, errorSource: ${errorSource}, action:${action},StatusCode:${statusCode} IP:${ip}  )`;
          },
        ),
        format(info => {
          info.message = `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
          return info;
        })(),
      ),
    }),
    new transports.File({
      filename: path.join(__dirname, '../logs/error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true,
      format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.errors({stack: true}),
        format.splat(),
        format.json(),
      ),
    }),
    new transports.File({
      filename: path.join(__dirname, '../logs/combined.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      tailable: true,
      format: format.combine(
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.errors({stack: true}),
        format.splat(),
        format.json(),
      ),
    }),
  ],
});

module.exports = {logger};
