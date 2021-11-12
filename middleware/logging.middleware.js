const fs = require("fs");

module.exports = (req, res, next) => {
  const logTime = new Date();
  const logData = `${req.method} - ${req.url} - ${logTime}\n`;

  fs.appendFile("Log/logger.txt", logData, (err, file) => {
    if (err) console.log(err);
  });
  next();
};
