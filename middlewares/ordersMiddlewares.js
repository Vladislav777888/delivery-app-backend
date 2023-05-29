const { AppError, catchAsync, orderValidator } = require("../utils");

exports.checkAddOrder = catchAsync(async (req, res, next) => {
  const { error, value } = orderValidator.createOrderValidator(req.body);

  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  req.body = value;

  next();
});

exports.checkFindOrder = catchAsync(async (req, res, next) => {
  const { error, value } = orderValidator.findOrderValidator(req.body);

  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  req.body = value;

  next();
});
