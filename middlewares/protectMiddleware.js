const { catchAsync, AppError } = require("../utils");

exports.protectRoute = catchAsync(async (req, res, next) => {
  const { key } = req.query;
  const currentUser = {};

  if (!key) return next(new AppError(404, "Not found!!!"));

  currentUser.userId = key;
  req.user = currentUser;

  next();
});
