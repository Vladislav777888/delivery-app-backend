const Joi = require("joi");

const { regExp } = require("../constants");

exports.createOrderValidator = (data) => {
  const schema = Joi.object({
    name: Joi.string()
      .regex(regExp.NAME_REGEX)
      .messages({
        "string.pattern.base": "Enter a valid name",
      })
      .required(),
    email: Joi.string()
      .email({
        tlds: { allow: false },
      })
      .required(),
    phone: Joi.string()
      .regex(regExp.PHONE_REGEX)
      .allow(null, "")
      .messages({
        "string.pattern.base":
          "Enter a valid phone number in a format '+380000000000'",
      })
      .required(),
    address: Joi.string().allow(null, "").required(),
    // orderProducts: Joi.array().items(Joi.string()),
    // totalPrice: Joi.number(),
  });

  return schema.validate(data);
};

exports.findOrderValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email({
      tlds: { allow: false },
    }),
    phone: Joi.string().regex(regExp.PHONE_REGEX).allow(null, "").messages({
      "string.pattern.base":
        "Enter a valid phone number in a format '+380000000000'",
    }),
    _id: Joi.string(),
  });

  return schema.validate(data);
};
