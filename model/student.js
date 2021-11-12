const mongoose = require("mongoose");
const Joi = require("joi");

const Schema = mongoose.Schema;
const model = mongoose.model;
const ObjectId = mongoose.Schema.Types.ObjectId;

const studentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    enum: ["beginner", "intermediate", "advanced"],
    required: true,
  },
  mentor: {
    type: ObjectId,
    ref: "Mentor",
    default: null,
  },
  batch: {
    type: ObjectId,
    ref: "Batch",
    required: true,
  },
});

const Student = model("Student", studentSchema);

const validateMentor = (mentor) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    course: Joi.string().required(),
    level: Joi.string()
      .valid("beginner", "intermediate", "advanced")
      .required(),
    // mobile: Joi.number(),
    // dateOfBirth: Joi.date().required(),
    // courseJoinDate: Joi.date().required(),
  });
  return schema.validate(mentor);
};

module.exports = { Student, validate: validateMentor };
