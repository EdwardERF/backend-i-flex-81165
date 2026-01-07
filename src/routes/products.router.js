import express from "express";
import ProductManager from "../productManager.js";
import uploader from "../utils/uploader.js";

const productsRouter = express.Router();
const productManager = new ProductManager("./src/products.json");

// productsRouter.post("/", uploader.single("file"), async(req, res)=> {
//   try {
//     //recibir data del formulario
//     // TODO: Agregar parametros de mi producto
    
//     const title = req.body.title;
//     const price = parseInt(req.body.price);
//     const thumbnail = "/img/"+ req.file.filename;
  
//     await productManager.addProduct({ title, price, thumbnail });
//     res.redirect("/dashboard");
//   } catch (error) {
//     console.log(error);
//   }
// })


// Ruteo producto
productsRouter.get("/", async (req, res)=> {
  try {
    const products = await productManager.getProducts();
    res.status(200).json({ message: "Lista de productos actualizada", products: products });  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productsRouter.delete("/:pid", async(req, res) => {
  try {
    const pid = req.params.pid;

    const products = await productManager.deleteProductById(pid);
    res.status(200).json({ message: "Producto eliminado", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productsRouter.post("/", async (req, res) => {
  try {
    const newProduct = req.body;

    const products = await productManager.addProduct(newProduct);
    res.status(201).json({ message: "Producto agregado", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

productsRouter.put("/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const update = req.body;

    const updatedProducts = await productManager.setProductsById(pid, update);
    res.status(200).json({ message: "Producto actualizado", updatedProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})



export default productsRouter;