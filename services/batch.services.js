const { pick } = require("lodash");
const ObjectId = require("../shared/ObjectId");
const { Batch, validate } = require("../model/batch");

const getAllBatch = async (req, res) => {
  const allBatch = await Batch.find().select("name");
  res.send(allBatch);
};

const getOne = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(404).send({ message: "Given ID is invalid" });

  const batch = await Batch.findById(id).select("name");

  if (!batch)
    return res.status(404).send({ message: "There is no Batch for given Id" });
  res.send(batch);
};
const create = async (req, res) => {
  const { error, value } = validate(req.body);
  if (error) return res.status(401).send({ message: error.message });

  const batch = await Batch(value);
  await batch.save();

  res.send(pick(batch, ["_id", "name"]));
};
const update = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(404).send({ message: "Given ID is invalid" });

  const { error } = validate(req.body);
  if (error) return res.status(401).send({ message: error.message });

  const batch = await Batch.findByIdAndUpdate(
    id,
    {
      $set: { name: req.body.name },
    },
    { new: true }
  ).select("name");

  if (!batch)
    return res.status(404).send({ message: "There is no Batch for given Id" });

  res.send(batch);
};
const remove = async (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id))
    return res.status(404).send({ message: "Given ID is invalid" });

  const batch = await Batch.findByIdAndDelete(id);
  if (!batch)
    return res.status(404).send({ message: "There is no Batch for given Id" });
  res.send({});
};

module.exports = {
  get: getAllBatch,
  getOne,
  create,
  update,
  remove,
};
