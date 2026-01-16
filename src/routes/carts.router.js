import express from "express";
import { createCart, getCartById, addProductToCart, deleteCartById } from "../controllers/cart.controller.js"

const cartsRouter = express.Router();

// Ruteo cart con Mongoose para post("/"
cartsRouter.post("/", createCart);

cartsRouter.get( "/:cid", getCartById);

cartsRouter.post( "/:cid/product/:pid", addProductToCart);

cartsRouter.delete("/:cid", deleteCartById);



export default cartsRouter;