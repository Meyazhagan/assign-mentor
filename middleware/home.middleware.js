const config = require("config");

module.exports = (req, res) => {
  res.send({ documentationLink: config.get("documentation") });
};
