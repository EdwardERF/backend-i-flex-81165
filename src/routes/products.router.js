import express from "express";
import ProductManager from "../productManager.js";
import Product from "../models/product.model.js";
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
// productsRouter.get("/", async (req, res)=> {
//   try {
//     const products = await productManager.getProducts();
//     res.status(200).json({ message: "Lista de productos actualizada", products: products });  
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Ruteo producto con Mongoose para get("/")
productsRouter.get("/", async (req, res)=> {
  try {
    const products = await Product.find().lean(); // .lean() Trae solo datos limpios que son lo que necesito

    res.status(200).json({ status: "success", payload: products });  
  } catch (error) {
    res.status(500).json({ status: "error", message: "Error al recuperar los productos" });
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

// productsRouter.post("/", async (req, res) => {
//   try {
//     const newProduct = req.body;

//     const products = await productManager.addProduct(newProduct);
//     res.status(201).json({ message: "Producto agregado", products });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

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

// productsRouter.put("/:pid", async (req, res) => {
//   try {
//     const pid = req.params.pid;
//     const update = req.body;

//     const updatedProducts = await productManager.setProductsById(pid, update);
//     res.status(200).json({ message: "Producto actualizado", updatedProducts });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// })

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