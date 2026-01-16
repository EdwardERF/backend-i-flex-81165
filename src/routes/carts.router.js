import express from "express";
import { createCart, getCartById, addProductToCart, deleteCartById, deleteProductFromCart } from "../controllers/cart.controller.js"

const cartsRouter = express.Router();

// Ruteo cart con Mongoose para post("/"
cartsRouter.post("/", createCart);

cartsRouter.get( "/:cid", getCartById);

cartsRouter.post( "/:cid/product/:pid", addProductToCart);

cartsRouter.delete("/:cid", deleteCartById);

cartsRouter.delete("/:cid/product/:pid", deleteProductFromCart);

export default cartsRouter;