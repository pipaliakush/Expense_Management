const Source = require("../models/source");
const validateObjectId = require("./validators/objectId.validator");
const validateSource = require("./validators/source.validator");

const getSources = (req, res) => {
  res.status(200).send({ name: "source" });
};

const getSourceById = async (req, res) => {
  const { error } = validateObjectId(req.params.id);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const source = await Source.findById(req.params.id);
  if (!source) {
    return res.status(404).send("The Source does not exist");
  }

  return res.send(source);
};

const createSource = async (req, res) => {
  const sourceData = req.body;
  const { error } = validateSource(sourceData);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const source = await Source.create({
    name: sourceData.name,
    type: sourceData.type,
    userId: sourceData.userId || req.user.id,
  });

  return res.send(source);
};

const updateSource = async (req, res) => {
  const sourceData = req.body;
  const { error } = validateSource(sourceData);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const source = await Source.findByIdAndUpdate(
    req.params.id,
    {
      name: sourceData.name,
      type: sourceData.type,
    },
    { new: true }
  );

  if (!source) {
    return res.status(404).send("The Source to be updated does not exist.");
  }

  return res.send(source);
};

const deleteSource = async (req, res) => {
  const { error } = validateObjectId(req.params.id);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const source = await Source.findByIdAndDelete(req.params.id);
  if (!source) {
    return res.status(404).send("The Source to be deleted does not exist.");
  }

  return res.send(source);
};

module.exports = {
  getSources,
  getSourceById,
  createSource,
  updateSource,
  deleteSource,
};
