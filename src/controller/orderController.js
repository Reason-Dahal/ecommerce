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
