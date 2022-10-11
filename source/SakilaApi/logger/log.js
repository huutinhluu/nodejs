import log4js from "log4js"

log4js.configure({
  "appenders": {
    "application": {
      "type": "console"
    },
    "file": {
      "type": "file",
      "filename": "app.log",
      "compression": true,
      "maxLogSize": 10485760,
      "backups": 100
    }
  },
  "categories": {
    "default": {
      "appenders": [
        "application",
        "file"
      ],
      "level": "debug"
    }
  }
});
export const logger4js = log4js.getLogger();