const Joi = require("joi");

const transactionSchema = Joi.object({
  userId: Joi.objectId().required().label("User Id"),
  type: Joi.string().valid("income", "expense").required().label("Type"),
  sourceId: Joi.objectId().required().label("Source Id"),
  title: Joi.string().max(50).required().label("Title"),
  amount: Joi.number().required().label("Amount"),
  spentOn: Joi.string().max(50).required().label("Spent On"),
  categoryId: Joi.objectId().required().label("Category Id"),
  note: Joi.string().max(300).label("Note"),
  image: Joi.string().label("Image"),
});

const validateTransaction = (source) => {
  return transactionSchema.validate(source);
};

module.exports = validateTransaction;
