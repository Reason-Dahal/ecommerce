import express from "express";
import { addProduct, deleteProduct, updateProduct, viewAllProduct, viewProductById } from "../controller/productController.js";
import {admin, protect} from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"

 const productRouter = express.Router();

productRouter.post("/addProduct", protect,admin,upload.single("url"),addProduct);
productRouter.get("/getAllProduct",viewAllProduct);
productRouter.get("/getProductById/:id",viewProductById);
productRouter.put("/updateProduct/:id",updateProduct);
productRouter.delete("/deleteProduct/:id",deleteProduct);

export default productRouter;
