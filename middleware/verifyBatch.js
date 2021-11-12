const { Batch } = require("../model/batch");
const { isValid } = require("../shared/ObjectId");

module.exports = async (req, res, next) => {
  const batch_name = req.headers.batch_name;
  const batch_id = req.headers.batch_id;
  let batch = null;
  if (batch_id && isValid(batch_id)) {
    batch = await Batch.findById(batch_id);
  } else if (batch_name) {
    batch = await Batch.findOne({ name: batch_name });
  }
  if (!batch)
    return res.status(400).send({ message: "Batch Id or Name is invalid" });
  req.batch = batch;
  next();
  return;
};
