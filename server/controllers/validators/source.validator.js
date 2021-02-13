const Joi = require("joi");

const sourceSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().label("Name"),
  type: Joi.string().required().label("Type"),
  userId: Joi.objectId(),
});

const validateSource = (source) => {
  return sourceSchema.validate(source);
};

module.exports = validateSource;
