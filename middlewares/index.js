const ordersMiddlewares = require("./ordersMiddlewares");
const productsMiddlewares = require("./productsMiddlewares");
const protectMiddleware = require("./protectMiddleware");

module.exports = {
  ordersMiddlewares,
  productsMiddlewares,
  protectMiddleware,
};
