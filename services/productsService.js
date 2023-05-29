const { Product } = require("../models");

exports.getAllProducts = async ({ skip = 0, limit = 9 }) => {
  try {
    const total = await Product.find().count();

    const products = await Product.find()
      .select("-whoAddToCart")
      .sort({ title: 1 })
      .skip(skip)
      .limit(limit);

    // eslint-disable-next-line array-callback-return
    products.map((item) => {
      item.count = 1;
      item.save();
    });

    return { products, total };
  } catch (error) {
    console.log(error);
  }
};

exports.getProductsByCategory = async (category, { skip = 0, limit = 9 }) => {
  try {
    const total = await Product.find({ shop: category }).count();

    const products = await Product.find({ shop: category })
      .select("-whoAddToCart")
      .sort({ title: 1 })
      .skip(skip)
      .limit(limit);

    return { products, total };
  } catch (error) {
    console.log(error);
  }
};

exports.addProductToCart = async (userId, productId) => {
  try {
    const product = await Product.findOneAndUpdate(
      { _id: productId },
      { $push: { whoAddToCart: userId } },
      { new: true }
    ).select("-whoAddToCart");

    return product;
  } catch (error) {
    console.log(error);
  }
};

exports.removeProductFromCart = async (userId, productId) => {
  try {
    return await Product.findOneAndUpdate(
      { _id: productId },
      { $pull: { whoAddToCart: userId } },
      {
        new: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.getUserCarts = async (userId, { skip = 0, limit = 9 }) => {
  try {
    const total = await Product.find({
      whoAddToCart: { $in: userId },
    }).count();

    const products = await Product.find({
      whoAddToCart: { $in: userId },
    })
      .select("-whoAddToCart")
      .sort({
        createdAt: -1,
      })
      .skip(skip)
      .limit(limit);

    return { products, total };
  } catch (error) {
    console.log(error);
  }
};

exports.updateProductCount = async (productId, body) => {
  try {
    const updateProduct = await Product.findOneAndUpdate(
      { _id: productId },
      body,
      {
        new: true,
      }
    ).select("-whoAddToCart -__v");

    return updateProduct;
  } catch (error) {
    console.log(error);
  }
};
