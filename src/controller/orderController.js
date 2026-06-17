import Order from "../model/orderModel.js";
import User from "../model/userModel.js";

export const createOrder = async (req,res)=>{
    try {
        const {orderItem,shippingAddress,totalPrice} = req.body;
        if(orderItem && orderItem.length==0){
            return res.status(400).send({message:"No Order Item"});
        }
const order = new Order({
    user:req.user._id,
    orderItem:orderItem,
    shippingAddress:shippingAddress,
    totalPrice:totalPrice

})
 await order.save();
 res.status(201).send({message:"order Created",order});

    } catch (error) {
        console.error(error);
        
    }
}

export const getMyOrder = async(req,res)=>{
    try {
        const orders = await Order.find({user:req.user._id});
        res.json({ message: "Your all order" , orders});
        
    } catch (error) {
        console.log(error);
        
    }

}

export const getAllOrder = async (req, res, next) => {
    try {
      const orders = await Order.find({}).populate("user", "id name email") .populate("items.productRef");
      res.json({message:"all order",orders});
    } catch (error) {
      console.error(error);
    }
  };

  export const updateOrderStatus = async (req, res, next) => {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) throw new Error("Order not found");
  
      order.status = req.body.status || order.status;
      const updatedOrder = await order.save();
      res.json({message:"order status updated",updatedOrder});
    } catch (error) {
      next(error);
    }
  };