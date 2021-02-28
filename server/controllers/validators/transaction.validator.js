const Joi = require('joi');

const transactionSchema = Joi.object({
  userId: Joi.objectId().required().label('User Id'),
  type: Joi.string().valid('income', 'expense').required().label('Type'),
  sourceId: Joi.objectId().required().label('Source Id'),
  title: Joi.string().max(50).required().label('Title'),
  amount: Joi.number().required().label('Amount'),
  spentOn: Joi.date().iso().required().label('Spent On'),
  categoryId: Joi.objectId().required().label('Category Id'),
  note: Joi.string().allow('').max(300).label('Note'),
  image: Joi.string().allow(null).allow('').label('Image'),
});

const validateTransaction = (source) => {
  return transactionSchema.validate(source);
};

const transactionQueryParamSchema = Joi.object({
  startDate: Joi.date().iso().required().label('Start Date'),
  endDate: Joi.date().iso().required().label('End Date'),
});

const validateTransactionQueryParams = (queryParams) => {
  return transactionQueryParamSchema.validate(queryParams);
};

module.exports = {
  validateTransaction,
  validateTransactionQueryParams,
};
