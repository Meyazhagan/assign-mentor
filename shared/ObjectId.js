const mongoose = require("mongoose");

const isValid = (objectId) => {
  return mongoose.Types.ObjectId.isValid(objectId);
};

module.exports = { isValid };
