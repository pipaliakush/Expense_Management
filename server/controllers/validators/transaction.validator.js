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

const datePattern = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/;
const transactionQueryParamSchema = Joi.object({
  filterBy: Joi.string().valid('all', 'income', 'expense').label('Filter By'),
  startDate: Joi.string().pattern(datePattern).label('Start Date'),
  endDate: Joi.string().pattern(datePattern).label('End Date'),
});

const validateTransactionQueryParams = (queryParams) => {
  return transactionQueryParamSchema.validate(queryParams);
};

module.exports = {
  validateTransaction,
  validateTransactionQueryParams,
};
