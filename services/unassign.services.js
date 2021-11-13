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
    studentIds: Joi.array().items(Joi.objectId()).required(),
  });
  const {
    error,
    value: { studentIds },
  } = await bodySchema.validate(req.body);

  if (error) return res.status(401).send({ message: error.message });
  try {
    const result = await Student.updateMany(
      { _id: { $in: studentIds }, batch: batchId },
      { $unset: { mentor: null } }
    );
    res.send({ message: "Successfully Unassigned" });
  } catch (err) {
    return res.status(400).send({ error: "error" });
  }
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
  try {
    const result = await Student.updateOne(
      { _id: studentId, batch: batchId },
      { $unset: { mentor: null } }
    );
    res.send({ message: "Successfully Unassigned" });
  } catch (err) {
    return res.status(400).send({ error: "error" });
  }
};

module.exports = {
  getAllStudent,
  one,
  many,
};
