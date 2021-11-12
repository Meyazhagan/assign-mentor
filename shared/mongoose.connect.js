const mongoose = require("mongoose");
const config = require("config");

const connect = () => {
  mongoose
    .connect(config.get("mongodb"))
    .then(() => {
      console.log("Connected to mongo db");
    })
    .catch((err) =>
      console.log("Error occurred while connecting to Database", err)
    );
};

module.exports = { connect };
