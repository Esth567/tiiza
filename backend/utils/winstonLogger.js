const {createLogger, format, transports} = require('winston');
const path = require('path');
const conditionalFields = (_action, _message) => {
  return `${_message} ${_action}`;
};
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
    // new transports.Console({
    //   format: format.combine(
    //     format(info => {
    //       info.message = `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    //       return info;
    //     })(),
    //   ),
    // }),
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
    new transports.File({
      filename: path.join(__dirname, '../logs/info.log'),
      level: 'info',
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
      filename: path.join(__dirname, '../logs/warning.log'),
      level: 'warn',
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
