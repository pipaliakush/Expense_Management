const Category = require('../models/category');
const validateObjectId = require('./validators/objectId.validator');
const validateCategory = require('./validators/category.validator');
const Transaction = require('../models/transaction');
const { ObjectId } = require('mongodb');

const getCategories = async (req, res) => {
  const categories = await Category.find({
    $or: [{ userId: req.user.id }, { isDefault: true, userId: null }],
  });
  res.send(categories);
};

const getCategoryById = async (req, res) => {
  const { error } = validateObjectId(req.params.id);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).send('The Category does not exist');
  }

  return res.send(category);
};

const createCategory = async (req, res) => {
  const categoryData = req.body;
  const { error } = validateCategory(categoryData);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const existedCategory = await Category.findOne({
    $and: [{ userId: req.user.id }, { name: categoryData.name.trim() } ],
  });

  if (existedCategory) {
    return res.status(403).send({message: 'This category is already exist!'});
  }

  const category = await Category.create({
    name: categoryData.name.trim(),
    icon: categoryData.icon.trim(),
    userId: req.user.id,
  });

  return res.send(category);
};

const updateCategory = async (req, res) => {
  const categoryData = req.body;
  const { error } = validateCategory(categoryData);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: categoryData.name.trim(),
      icon: categoryData.icon.trim(),
    },
    { new: true }
  );

  if (!category) {
    return res.status(404).send('The Category to be updated does not exist.');
  }

  return res.send(category);
};

const deleteCategory = async (req, res) => {
  const { error } = validateObjectId(req.params.id);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const transactionExists = await Transaction.find({userId: ObjectId(req.user.id), categoryId: ObjectId(req.params.id)})

  if (transactionExists && transactionExists.length) {
    return res.status(400).send({message: "Some transactions are already associated with this category!"});
  }


  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) {
    return res.status(404).send('The Category to be deleted does not exist.');
  }

  return res.send(category);
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
