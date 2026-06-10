import Order from "../model/orderModel.js";

export const createOrder = async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No order items");
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error(error);
  }
};

export const getMyOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json({ message: "Your all order" }, orders);
  } catch (error) {
    console.error(error);
  }
};

// @desc    Get all orders (Admin only)
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({}).populate("user", "id name email");
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin only)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) throw new Error("Order not found");

    order.status = req.body.status || order.status;
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
