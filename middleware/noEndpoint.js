const config = require("config");

module.exports = (req, res) => {
  return res.status(400).send({
    message: "No such Endpoint",
    documentationLink: config.get("documentation"),
  });
};
