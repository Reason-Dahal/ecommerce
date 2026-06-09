import express from "express";
import { addProduct, deleteProduct, updateProduct, viewAllProduct, viewProductById } from "../controller/productController.js";

 const productRouter = express.Router();

productRouter.post("/addProduct", addProduct);
productRouter.get("/getAllProduct",viewAllProduct);
productRouter.get("/getProductById/:id",viewProductById);
productRouter.put("/updateProduct/:id",updateProduct);
productRouter.delete("/deleteProduct/:id",deleteProduct);

export default productRouter;
