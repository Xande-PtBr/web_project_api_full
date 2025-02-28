const winston = require("winston");
const expressWinston = require("express-winston");

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: "request.log",
    }), //salvando os logs de requisicoes em um arquivo
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "error.log",
    }), //salvando os logs de erros em um arquivo
  ],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };
