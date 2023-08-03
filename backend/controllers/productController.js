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

export { getProductById, getProducts };
