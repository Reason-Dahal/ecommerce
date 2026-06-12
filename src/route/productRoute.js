import express from "express";
import { addProduct, deleteProduct, updateProduct, viewAllProduct, viewProductById } from "../controller/productController.js";
import {admin, protect} from "../middleware/authMiddleware.js";

 const productRouter = express.Router();

productRouter.post("/addProduct", protect,admin,addProduct);
productRouter.get("/getAllProduct",viewAllProduct);
productRouter.get("/getProductById/:id",viewProductById);
productRouter.put("/updateProduct/:id",updateProduct);
productRouter.delete("/deleteProduct/:id",deleteProduct);

export default productRouter;
