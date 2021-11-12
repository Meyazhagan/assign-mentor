const { pick } = require("lodash");
const ObjectId = require("../shared/ObjectId");
const { Student, validate } = require("../model/student");

const pickProperity = ["name", "email", "course", "level"];

const getAllStudent = async (req, res) => {
  const students = await Student.find({ batch: req.batch?._id })
    .select("-__v")
    .populate("batch");
  res.send(students);
};

const getOne = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(404).send({ message: "Given ID is invalid" });

  const student = await Student.findOne({ _id: id, batch: req.batch?._id })
    .select("-__v")
    .populate("batch");

  if (!student)
    return res.status(404).send({
      message: `There is no student for given Id in Batch ${req.batch.name}`,
    });
  res.send(student);
};
const create = async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(401).send({ message: error.message });

  const student = await Student(pick(value, pickProperity));
  student.batch = req.batch?._id;

  await student.save();

  res.send(student);
};
const update = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(404).send({ message: "Given ID is invalid" });

  const { error } = validate(req.body);
  if (error) return res.status(401).send({ message: error.message });

  const student = await Student.findOneAndUpdate(
    { _id: id, batch: req.batch?._id },
    { $set: { ...pick(req.body, pickProperity) } },
    { new: true }
  )
    .select("-__v")
    .populate("batch");

  if (!student)
    return res.status(404).send({
      message: `There is no student for given Id in Batch ${req.batch.name}`,
    });
  res.send(student);
};
const remove = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(404).send({ message: "Given ID is invalid" });

  const student = await Student.findOneAndDelete({
    _id: id,
    batch: req.batch?._id,
  });

  if (!student)
    return res.status(404).send({
      message: `There is no student for given Id in Batch ${req.batch.name}`,
    });
  res.send({});
};

module.exports = {
  get: getAllStudent,
  getOne,
  create,
  update,
  remove,
};
