const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;
const model = mongoose.model;

const batchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Batch = model("Batch", batchSchema);

const validateBatch = (batch) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(batch);
};

module.exports = { Batch, validate: validateBatch };
