import express from "express";
import CartManager from "../cartManager.js";
import Cart from "../models/cart.model.js";

const cartsRouter = express.Router();
const cartManager = new CartManager("./src/carts.json");

// Ruteo cart con Mongoose para post("/"
cartsRouter.post("/", async (req, res) => {
  try {
    const receivedCart = req.body;
    
    const newCart = await Cart.create(receivedCart);
    res.status(201).json({ status: "success", newCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al agregar carrito" });
  }
});

// cartsRouter.post("/", async (req, res) => {
//   try {
//     const carts = await cartManager.addCart();
//     res.status(201).json({ message: "Carrito agregado", carts });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

cartsRouter.get( "/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;

    const cartProducts = await cartManager.getProductsByCartId(cid);
    res.status(200).json({ message: "Se muestran lista de productos", cartProducts });  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartsRouter.post( "/:cid/product/:pid", async (req, res) => {
  try {

    const cid = req.params.cid;
    const pid = req.params.pid;
    
    const carts = await cartManager.addProductToCart(cid, pid);
    res.status(201).json({ message: "Producto agregado a carrito", carts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default cartsRouter;