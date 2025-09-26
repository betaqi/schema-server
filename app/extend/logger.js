const log4js = require("log4js");

module.exports = (app) => {
  let logger;
  if (app.envFn.isLocal()) {
    // 本地环境，打印到控制台
    log4js.configure({
      appenders: {
        out: { type: 'console' }
      }, categories: {
        default: { appenders: ['out'], level: 'debug' }
      }
    });
    logger = log4js.getLogger();
  } else {
    // 其他环境，打印到文件 增加时间
    log4js.configure({
      appenders: {
        console: { type: 'console' },
        file: {
          type: 'dateFile',
          filename: `./logs/app.log`,
          maxLogSize: 10485760,
          backups: 3,
          compress: true,
          daysToKeep: 30,
          keepFileExt: true,
          layout: {
            type: 'pattern', pattern: '%d{yyyy-MM-dd hh:mm:ss} [%p] %m'
          }
        }
      }, categories: {
        default: {
          appenders: ['console', 'file'], level: 'trace'
        }
      }
    });
    logger = log4js.getLogger();
  }


  return logger;
}