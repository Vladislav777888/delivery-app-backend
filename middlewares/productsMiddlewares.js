const { Types } = require("mongoose");
const { AppError, catchAsync, productsValidator } = require("../utils");
const { Product } = require("../models");

exports.checkIsValidId = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const idIsValid = Types.ObjectId.isValid(id);

  if (!idIsValid) {
    return next(new AppError(404, "Not found !!!"));
  }

  next();
});

exports.checkAddProductToCart = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { id: productId } = req.params;

  const { whoAddToCart } = await Product.findOne({ _id: productId });

  if (whoAddToCart.includes(userId)) {
    return next(new AppError(409, "This product already added to cart"));
  }

  next();
});

exports.checkDelProductFromCart = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { id: productId } = req.params;

  const { whoAddToCart } = await Product.findOne({ _id: productId });

  if (!whoAddToCart.includes(userId)) {
    return next(new AppError(404, "This product not in cart"));
  }

  next();
});

exports.checkProductCount = catchAsync(async (req, res, next) => {
  const { error, value } = productsValidator.productCountValidator(req.body);

  if (error) {
    return next(new AppError(400, error.details[0].message));
  }

  req.body = value;

  next();
});
