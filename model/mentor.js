const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.Schema.Types.ObjectId;

const mentorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: [String],
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  batch: {
    type: ObjectId,
    ref: "Batch",
    required: true,
  },
});

const Mentor = model("Mentor", mentorSchema);

const validateMentor = (mentor) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.array().items(Joi.string()).required(),
    experience: Joi.number().required(),
    // mobile: Joi.number(),
    // dateOfBirth: Joi.date().required(),
    // joinDate: Joi.date().required(),
  });
  return schema.validate(mentor);
};

module.exports = { Mentor, validate: validateMentor };
