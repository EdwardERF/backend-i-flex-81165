import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { throwHttpError } from "../utils/httpError.js";
import mongoose from "mongoose";

export const createCart = async (req, res, next) => {
  try {
    const newCart = await Cart.create({});
    res.status(201).json({ status: "success", payload: newCart });
  } catch (error) {
    next(error);
  }
}

export const getCartById = async (req, res) => {
  try {
    const cid = req.params.cid;

    const cart = await Cart.findById(cid).populate("products.product");
    if(!cart) throwHttpError("Carrito no encontrado", 404);
    
    res.status(200).json({ status: "success", payload: cart.products });  
  } catch (error) {
    next(error);
  }
}

export const addProductToCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    
    // Verificar que el carrito exista via Mongoose
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      throwHttpError("Carrito no encontrado", 404);
    }

    // Verificar que el producto exista via Mongoose
    if (!mongoose.Types.ObjectId.isValid(pid)) {
      throwHttpError("Producto no encontrado", 404);
    }
    
    // Verificar que el producto exista via logica interna
    const productExists = await Product.findById(pid);
    if (!productExists) throwHttpError("Producto no encontrado", 404);

    // Verificar que el carrito exista
    const cart = await Cart.findById(cid)
    if (!cart) throwHttpError("Carrito no encontrado", 404);

    // Verificar si el producto existe en el carrito
    // Si existe, incrementar la cantidad
    // Si no existe, agregarlo como nuevo
    const existingProduct = cart.products.find( (cart) => cart.product.toString() === pid );

    let updatedCart;
    
    if (existingProduct) {
      // updatedCart = await Cart.findByIdAndUpdate(cid, { $inc: { "products.$.quantity": quantity } }, { new: true, runValidators: true })
      updatedCart = await Cart.findOneAndUpdate({ _id: cid, "products.product": pid },{ $inc: { "products.$.quantity": quantity } },{ new: true, runValidators: true });  
    } else {
      updatedCart = await Cart.findByIdAndUpdate(cid, { $push: { products: { product: pid, quantity } } }, { new: true, runValidators: true })  
    }

    res.status(201).json({ status: "success", payload: updatedCart });
  } catch (error) {
    next(error);
  }
}

export const deleteCartById = async(req, res, next) => {
  try {
    const cid = req.params.cid;

    const deletedCart = await Cart.findByIdAndDelete(cid);

    // En caso de que el deletedCart no exista, va a ser un caso en donde no encontró el Id, por lo que retornamos error.
    if(!deletedCart) throwHttpError("Carrito no encontrado", 404);

    res.status(200).json({ status: "success", payload: deletedCart });
  } catch (error) {
    next(error);
  }
}