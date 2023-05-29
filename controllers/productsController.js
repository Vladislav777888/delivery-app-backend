const { catchAsync } = require("../utils");
const { productsService } = require("../services");

exports.getAllProducts = catchAsync(async (req, res, next) => {
  let { page = 1, limit = 9 } = req.query;

  page = +page;
  limit = +limit;

  limit = limit > 9 ? 9 : limit;
  const skip = (page - 1) * limit;

  const { products, total } = await productsService.getAllProducts({
    skip,
    limit,
  });

  res.status(200).json({ products, page, per_page: limit, total });
});

exports.getProductsByCategory = catchAsync(async (req, res, next) => {
  const { category } = req.params;
  let { page = 1, limit = 9 } = req.query;

  page = +page;
  limit = +limit;

  limit = limit > 9 ? 9 : limit;
  const skip = (page - 1) * limit;

  const { products, total } = await productsService.getProductsByCategory(
    category,
    {
      skip,
      limit,
    }
  );

  res.status(200).json({ products, page, per_page: limit, total });
});

exports.addProductToCart = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { id: productId } = req.params;

  const product = await productsService.addProductToCart(userId, productId);

  res.status(200).json({
    product,
  });
});

exports.removeProductFromCart = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { id: productId } = req.params;

  await productsService.removeProductFromCart(userId, productId);

  res.status(200).json({ message: "Product was deleted from cart" });
});

exports.getUserCarts = catchAsync(async (req, res) => {
  const { userId } = req.user;
  let { page = 1, limit = 9 } = req.query;

  page = +page;
  limit = +limit;

  limit = limit > 9 ? 9 : limit;

  const skip = (page - 1) * limit;

  const { products, total } = await productsService.getUserCarts(userId, {
    skip,
    limit,
  });

  res.status(200).json({ products, page, per_page: limit, total });
});

exports.updateProductCount = catchAsync(async (req, res, next) => {
  const { id: productId } = req.params;

  const product = await productsService.updateProductCount(productId, req.body);

  res.status(200).json({
    product,
  });
});
