const express = require("express");
const productsRouter = express.Router();

const { protectMiddleware, productsMiddlewares } = require("../middlewares");
const { productsController } = require("../controllers");

// Мідлвара для розпізнавання конкретного юзера
productsRouter.use(protectMiddleware.protectRoute);

// Отримання всіх карточок
productsRouter.route("/").get(productsController.getAllProducts);

// Отримання карточок конкретного магазину
productsRouter
  .route("/:category")
  .get(productsController.getProductsByCategory);

// Додавання карточки до заказу
productsRouter
  .route("/:id/order")
  .post(
    [
      productsMiddlewares.checkIsValidId,
      productsMiddlewares.checkAddProductToCart,
    ],
    productsController.addProductToCart
  );

// Видалення карточки із заказу
productsRouter
  .route("/:id/order")
  .delete(
    [
      productsMiddlewares.checkIsValidId,
      productsMiddlewares.checkDelProductFromCart,
    ],
    productsController.removeProductFromCart
  );

// Зміна кількості конкретного продукта в заказі
productsRouter
  .route("/:id/order")
  .patch(
    [productsMiddlewares.checkIsValidId, productsMiddlewares.checkProductCount],
    productsController.updateProductCount
  );

// Отримання списка карточок, які були додані до заказу
productsRouter.route("/user/order").get(productsController.getUserCarts);

module.exports = productsRouter;
