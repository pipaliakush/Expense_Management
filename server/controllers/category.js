const Category = require('../models/category');
const validateObjectId = require('./validators/objectId.validator');
const validateCategory = require('./validators/category.validator');

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

  const category = await Category.create({
    name: categoryData.name,
    icon: categoryData.icon,
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
      name: categoryData.name,
      icon: categoryData.icon,
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
