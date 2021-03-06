const Joi = require('joi');

const dateRangePattern = /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/;

const dateRangeSchema = Joi.object({
  startDate: Joi.string().pattern(dateRangePattern).label('Start Date'),
  endDate: Joi.string().pattern(dateRangePattern).label('End Date'),
});

const validateDateRange = (dateRange) => {
  return dateRangeSchema.validate(dateRange);
};

module.exports = {
  dateRangePattern,
  validateDateRange,
};
