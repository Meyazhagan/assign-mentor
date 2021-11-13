const Joi = require("joi");
const { Mentor } = require("../model/mentor");
const { Student } = require("../model/student");
const { isValid } = require("../shared/ObjectId");

const getAllStudent = async (req, res) => {
  const batchId = req.batch?._id;
  const mentorId = req.params.mentorId;
  if (!isValid(mentorId))
    return res.status(400).send({ message: "Given Mentor Id is invalid" });

  const mentor = await Mentor.findOne({ _id: mentorId, batch: batchId });
  if (!mentor)
    return res.status(400).send({ message: "There is no mentor for given Id" });

  const assignedStudents = await Student.find({
    mentor: mentorId,
    batch: batchId,
  })
    .select("-__v")
    .populate("mentor", "name -_id");
  res.send(assignedStudents);
};

const many = async (req, res) => {
  const batchId = req.batch?._id;

  const bodySchema = Joi.object({
    mentorId: Joi.objectId().required(),
    studentIds: Joi.array().items(Joi.objectId()).required(),
  });

  const {
    error,
    value: { studentIds, mentorId },
  } = await bodySchema.validate(req.body);
  if (error) return res.status(401).send({ message: error.message });

  const mentor = await Mentor.findOne({ _id: mentorId, batch: batchId });
  if (!mentor)
    return res.status(400).send({ message: "There is no mentor for given Id" });
  try {
    const result = await Student.updateMany(
      { _id: { $in: studentIds }, batch: batchId },
      { $set: { mentor: mentorId } }
    );
    res.send({ message: "Successfully Assigned" });
  } catch (err) {
    return res.status(400).send({ error: "error" });
  }
};
const one = async (req, res) => {
  const batchId = req.batch?._id;

  const bodySchema = Joi.object({
    mentorId: Joi.objectId().required(),
    studentId: Joi.objectId().required(),
  });

  const {
    error,
    value: { studentId, mentorId },
  } = await bodySchema.validate(req.body);
  if (error) return res.status(401).send({ message: error.message });

  const mentor = await Mentor.findOne({ _id: mentorId, batch: batchId });
  if (!mentor)
    return res.status(400).send({ message: "There is no mentor for given Id" });
  try {
    const result = await Student.findOneAndUpdate(
      { _id: studentId, batch: req.batch?._id },
      { $set: { mentor: mentorId } }
    );
    res.send({ message: "Successfully Assigned" });
  } catch (err) {
    return res.status(400).send({ error: "error" });
  }
};

module.exports = {
  getAllStudent,
  one,
  many,
};
