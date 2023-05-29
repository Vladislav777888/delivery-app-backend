const Joi = require("joi");

exports.productCountValidator = (data) => {
  const schema = Joi.object({
    count: Joi.number().min(1),
  });

  return schema.validate(data);
};
