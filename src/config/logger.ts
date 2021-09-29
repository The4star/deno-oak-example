import { log } from '../deps.ts'

const setupLogger = async () => {
  const dateTime = new Date()
  await log.setup({
    handlers: {
      console: new log.handlers.ConsoleHandler("DEBUG", {
        formatter: `${dateTime.toLocaleString()} {levelName} {msg}`,
      })
    },
    loggers: {
      // configure default logger available via short-hand methods above.
      default: {
        level: "DEBUG",
        handlers: ["console"],
      }
    }
  })
  log.info("logger config initiated")  
}

export {
  setupLogger
}