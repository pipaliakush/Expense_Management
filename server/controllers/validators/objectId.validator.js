const Joi = require('joi');

const objectIdSchema = Joi.objectId().required();

const validateObjectId = (objectId) => {
  return objectIdSchema.validate(objectId);
};

module.exports = validateObjectId;
