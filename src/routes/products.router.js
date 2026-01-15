import express from "express";
import ProductManager from "../productManager.js";
import Product from "../models/product.model.js";
import uploader from "../utils/uploader.js";

const productsRouter = express.Router();
const productManager = new ProductManager("./src/products.json");

// Ruteo producto con Mongoose para get("/")
productsRouter.get("/", async (req, res)=> {
  try {
    const products = await Product.find().lean(); // .lean() Trae solo datos limpios que son lo que necesito

    res.status(200).json({ status: "success", payload: products });  
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al recuperar los productos" });
  }
});


// Ruteo producto con Mongoose para delete("/:pid"
productsRouter.delete("/:pid", async(req, res) => {
  try {
    const pid = req.params.pid;

    // const products = await productManager.deleteProductById(pid);
    const deletedProduct = await Product.findByIdAndDelete(pid);

    // En caso de que el deletedProduct no exista, va a ser un caso en donde no encontró el Id, por lo que retornamos error.
    if(!deletedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });

    res.status(200).json({ status: "success", payload: deletedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al eliminar producto" });
  }
});


// Ruteo producto con Mongoose para post("/")
productsRouter.post("/", async (req, res) => {
  try {
    const receivedProduct = req.body;

    const newProduct = await Product.create(receivedProduct);
    res.status(201).json({ status: "success", newProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al agregar producto" });
  }
});


// Ruteo producto con Mongoose para put("/:pid"
productsRouter.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const updateData = req.body;

    // con el new: true nos aseguramos que la variable updatedProduct tenga la data luego de que sea actualizada.
    // con el runValidators: true nos aseguramos que chequee el modelo de Products que creamos
    const updatedProduct = await Product.findByIdAndUpdate(pid, updateData, { new: true, runValidators: true });

    // En caso de que el updatedProduct no exista, va a ser un caso en donde no encontró el Id, por lo que retornamos error.
    if(!updatedProduct) return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    
    res.status(200).json({ status: "succcess", payload: updatedProduct });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al editar producto" });
  }
})


export default productsRouter;