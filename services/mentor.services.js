const { pick } = require("lodash");
const ObjectId = require("../shared/ObjectId");
const { Mentor, validate } = require("../model/mentor");

const pickProperity = ["name", "email", "role", "experience"];

const getAllMentor = async (req, res) => {
  const mentors = await Mentor.find({ batch: req.batch?._id })
    .select("-__v")
    .populate("batch");
  res.send(mentors);
};

const getOne = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(404).send({ message: "Given ID is invalid" });

  const mentor = await Mentor.findOne({ _id: id, batch: req.batch?._id })
    .select("-__v")
    .populate("batch");

  if (!mentor)
    return res.status(404).send({
      message: `There is no Mentor for given Id in Batch ${req.batch.name}`,
    });
  res.send(mentor);
};
const create = async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(401).send({ message: error.message });

  const mentor = await Mentor(pick(value, pickProperity));
  mentor.batch = req.batch?._id;

  await mentor.save();

  res.send(mentor);
};

const update = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(404).send({ message: "Given ID is invalid" });

  const { error } = validate(req.body);
  if (error) return res.status(401).send({ message: error.message });

  const mentor = await Mentor.findOneAndUpdate(
    { _id: id, batch: req.batch?._id },
    { $set: { ...pick(req.body, pickProperity) } },
    { new: true }
  )
    .select("-__v")
    .populate("batch");

  if (!mentor)
    return res.status(404).send({
      message: `There is no Mentor for given Id in Batch ${req.batch.name}`,
    });
  res.send(mentor);
};
const remove = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(404).send({ message: "Given ID is invalid" });

  const mentor = await Mentor.findOneAndDelete({
    _id: id,
    batch: req.batch?._id,
  });
  if (!mentor)
    return res.status(404).send({
      message: `There is no Mentor for given Id in Batch ${req.batch.name}`,
    });
  res.send({});
};

module.exports = {
  get: getAllMentor,
  getOne,
  create,
  update,
  remove,
};
