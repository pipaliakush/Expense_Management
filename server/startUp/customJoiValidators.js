const Joi = require("joi");

Joi.objectId = function objectId(message) {
  return Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": message || "Provided ID is not valid",
    });
};
