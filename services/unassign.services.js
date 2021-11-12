const Joi = require("joi");
const { Student } = require("../model/student");

const getAllStudent = async (req, res) => {
  const batchId = req.batch?._id;
  const assignedStudent = await Student.find({
    mentor: null,
    batch: batchId,
  }).select("-__v");
  res.send(assignedStudent);
};

const many = async (req, res) => {
  const batchId = req.batch?._id;
  const bodySchema = Joi.object({
    students: Joi.array().items(Joi.objectId()).required(),
  });
  const {
    error,
    value: { students },
  } = await bodySchema.validate(req.body);

  if (error) return res.status(401).send({ message: error.message });

  const result = await Student.updateMany(
    { _id: { $in: students }, batch: batchId },
    { $unset: { mentor: null } }
  );
  res.send(result);
};

const one = async (req, res) => {
  const batchId = req.batch?._id;
  const bodySchema = Joi.object({
    studentId: Joi.objectId().required(),
  });

  const {
    error,
    value: { studentId },
  } = await bodySchema.validate(req.body);
  if (error) return res.status(401).send({ message: error.message });

  const result = await Student.updateOne(
    { _id: studentId, batch: batchId },
    { $unset: { mentor: null } }
  );
  res.send(result);
};

module.exports = {
  getAllStudent,
  one,
  many,
};
