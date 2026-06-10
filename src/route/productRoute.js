import express from "express";

import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controller/productController";

const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/getAllProudcts", getAllProducts);
router.get("/getProductById/:id", getProductById);
router.put("/updateProduct/:id", updateProduct);
router.delete("/deleteProduct/:id", deleteProduct);

export default router;
