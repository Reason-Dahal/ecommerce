import express from "express";
import { createOrder, getAllOrder, getMyOrder, updateOrderStatus } from "../controller/orderController.js";
import { protect,admin } from "../middleware/authMiddleware.js";

  const orderRouter = express.Router();

 orderRouter.post("/createOrder",protect,createOrder);
 orderRouter.get("/getMyOrder",protect,getMyOrder);
 orderRouter.get("/getAllOrder",protect,admin,getAllOrder);
 orderRouter.put("/updateOrderStatus/:id",protect,admin,updateOrderStatus);

 export default orderRouter;