import express from "express";
const router = express.Router();
import * as productController from "../controllers/productController.js";

export default router
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getProductById)
  .post("/", productController.createNewProduct)
  .put("/:id", productController.updateProduct)
  .delete("/:id", productController.deleteProduct);
