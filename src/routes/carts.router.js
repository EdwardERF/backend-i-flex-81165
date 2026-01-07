import express from "express";
import CartManager from "../cartManager.js";

const cartsRouter = express.Router();
const cartManager = new CartManager("./src/carts.json");

export default cartsRouter;