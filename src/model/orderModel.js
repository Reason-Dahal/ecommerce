import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  orderItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      product: {
        tyep: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
    },
  ],
  shippingAddress: {
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered"],
    default: "Pending",
  },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
