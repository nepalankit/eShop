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
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    user: req.user._id,
    image: req.body.image,
    category: req.body.category,
    countInStock: req.body.countInStock,
    numReviews: req.body.numReviews,
    description: req.body.description,
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
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error("Resource nnot Found");
  }
});

export { getProductById, getProducts, createProduct, updateProduct };
