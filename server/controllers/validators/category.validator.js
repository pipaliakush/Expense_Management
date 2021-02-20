const Joi = require("joi");

const categorySchema = Joi.object({
  name: Joi.string().min(3).max(50).required().label("Name"),
  icon: Joi.string().required().label("Icon"),
});

const validateCategory = (category) => {
  return categorySchema.validate(category);
};

module.exports = validateCategory;
