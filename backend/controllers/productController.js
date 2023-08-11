import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc  fetch all products
//@route GET /api/products
//@acess public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}); // we want all of the products so passing empty object
  res.json(products);
});

// @desc  get all products
//@route GET /api/products/:id
//@acess public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Reosource not found");
  }
});

// @desc  create a products
//@route post /api/products
//@acess admin private
// const createProduct = asyncHandler(async (req, res) => {
//   const product = new Product({
//     name: "sample name",
//     price: 0,
//     user: req.user._id,
//     category: "sample category",
//     countInStock: 0,
//     numReviews: 0,
//     description: "Sample description",
//   });
//   const createdProduct = await product.save();
//   res.status(201).json(createdProduct);
// });

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc  edit a products
//@route pUT /api/products
//@acess admin private
const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Resource nnot Found");
  }
});
// @desc  delete a products
//@route delete /api/products
//@acess admin private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne({ id: product._id });
    res.status(200).json({ message: "Product deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});
// @desc  create a review
//@route post /api/products/:id/reviews
//@acess  private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export {
  getProductById,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
};
