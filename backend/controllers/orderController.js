import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";

// @desc  create new order
//@route POST /api/orders
//@acess private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    totalPrice,
    shippingPrice,
  } = req.body; //getting from body of http req

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No item found");
  } else {
    const order = new Order({
      orderItems: orderItems.map((x) => ({
        ...x,
        product: x._id,
        _id: undefined, // to get the id which wont come with models
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
});

// @desc  get logged in user order
//@route GET /api/orders/myorders
//@acess private

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
  });
  res.status(200).json(orders);
});

// @desc  get order my ID
//@route GET /api/orders/:id
//@acess private

const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  ); //passing id which is in url
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc  update order to paid
//@route GET /api/orders/:id/pay
//@acess Private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  res.send("updateOrderToPaid");
});
// @desc  update order to delivered
//@route GET /api/orders/:id/deliver
//@acess Private

const updateOrderToDelivered = asyncHandler(async (req, res) => {
  res.send("updateOrderToDelivered");
});

// @desc  get all orders
//@route GET /api/orders
//@acess Private/Admin

const getOrders = asyncHandler(async (req, res) => {
  res.send("get all Orders");
});

export {
  getOrders,
  addOrderItems,
  getMyOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
  getOrderById,
};
