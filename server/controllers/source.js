const Source = require('../models/source');
const validateObjectId = require('./validators/objectId.validator');
const validateSource = require('./validators/source.validator');
const Transaction = require('../models/transaction');
const { ObjectId } = require('mongodb');

const getSources = async (req, res) => {
  const sources = await Source.find({
    $or: [{ userId: req.user.id }, { isDefault: true, userId: null }],
  });
  res.send(sources);
};

const getSourceById = async (req, res) => {
  const { error } = validateObjectId(req.params.id);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const source = await Source.findById(req.params.id);
  if (!source) {
    return res.status(404).send('The Source does not exist');
  }

  return res.send(source);
};

const createSource = async (req, res) => {
  const sourceData = req.body;
  const { error } = validateSource(sourceData);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const existedSources = await Source.findOne({
    $and: [{ userId: req.user.id }, { name: sourceData.name.trim() }, { type: sourceData.type.trim() } ],
  });

  if (existedSources) {
    return res.status(403).send({message: 'This source is already exist!'});
  }

  const source = await Source.create({
    name: sourceData.name.trim(),
    type: sourceData.type.trim(),
    userId: req.user.id,
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
      name: sourceData.name.trim(),
      type: sourceData.type.trim(),
    },
    { new: true }
  );

  if (!source) {
    return res.status(404).send('The Source to be updated does not exist.');
  }

  return res.send(source);
};

const deleteSource = async (req, res) => {
  const { error } = validateObjectId(req.params.id);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const transactionExists = await Transaction.find({userId: ObjectId(req.user.id), sourceId: ObjectId(req.params.id)})

  if (transactionExists && transactionExists.length) {
    return res.status(400).send({message: "Some transactions are already associated with this source!"});
  }

  const source = await Source.findByIdAndDelete(req.params.id);
  if (!source) {
    return res.status(404).send('The Source to be deleted does not exist.');
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
