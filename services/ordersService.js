const { Order, Product } = require("../models");

exports.createOrder = async (body, userId) => {
  try {
    let totalPrice = 0;

    const products = await Product.find({
      whoAddToCart: { $in: userId },
    })
      .select("-whoAddToCart -updatedAt")
      .sort({
        createdAt: -1,
      });

    const newOrder = new Order({
      ...body,
      orderProducts: products,
    });

    newOrder.orderProducts.map(
      (item) => (totalPrice += item.count * item.price)
    );

    newOrder.totalPrice = totalPrice;
    newOrder.save();

    return newOrder;
  } catch (error) {
    console.log(error);
  }
};

exports.findOrder = async (body) => {
  try {
    const key = Object.keys(body)[0];
    const value = Object.values(body)[0];

    const orders = await Order.find({
      [key]: value,
    }).select("-__v -email -name -phone -address");

    return orders;
  } catch (error) {
    console.log(error);
  }
};
