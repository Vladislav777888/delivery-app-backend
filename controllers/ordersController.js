const { catchAsync } = require("../utils");
const { ordersService } = require("../services");

exports.createOrder = catchAsync(async (req, res, next) => {
  const { userId } = req.user;
  const { body } = req;

  const order = await ordersService.createOrder(body, userId);

  res.status(200).json({
    order,
  });
});

exports.findOrder = catchAsync(async (req, res, next) => {
  const { body } = req;

  const orders = await ordersService.findOrder(body);

  res.status(200).json({
    orders,
  });
});
