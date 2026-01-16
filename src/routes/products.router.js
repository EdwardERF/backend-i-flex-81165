import express from "express";
import { getAllProducts, deleteProductById, addProduct, setProductById } from "../controllers/products.controller.js"

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.delete("/:pid", deleteProductById);

productsRouter.post("/", addProduct);

productsRouter.put("/:pid", setProductById)

export default productsRouter;