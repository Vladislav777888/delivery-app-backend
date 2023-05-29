const express = require("express");
const ordersRouter = express.Router();

const { protectMiddleware, ordersMiddlewares } = require("../middlewares");
const { ordersController } = require("../controllers");

// Додавання заказу
ordersRouter
  .route("/")
  .post(
    [protectMiddleware.protectRoute, ordersMiddlewares.checkAddOrder],
    ordersController.createOrder
  );

// Пошук заказів юзера по емейлу, телефону або по id заказу
ordersRouter
  .route("/find")
  .post(
    [protectMiddleware.protectRoute, ordersMiddlewares.checkFindOrder],
    ordersController.findOrder
  );

module.exports = ordersRouter;
