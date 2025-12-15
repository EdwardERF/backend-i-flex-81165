import express from "express";
import ProductManager from "./productManager.js";
import CartManager from "./cartManager.js";

const app = express();
// Habilitamos poder recibir data en formato JSON
app.use( express.json() );
const productManager = new ProductManager("./src/products.json");
const cartManager = new CartManager("./src/carts.json");

//endpoints de products
app.get( "/", (req, res) => {
  res.json({ message: "Hola Mundo!!!" });
});

app.get( "/api/products", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    res.status(200).json({ message: "Lista de productos actualizada", products: products });  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete( "/api/products/:pid", async(req, res) => {
  try {
    const pid = req.params.pid;

    const products = await productManager.deleteProductById(pid);
    res.status(200).json({ message: "Producto eliminado", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post( "/api/products", async (req, res) => {
  try {
    const newProduct = req.body;

    const products = await productManager.addProduct(newProduct);
    res.status(201).json({ message: "Producto agregado", products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put( "/api/products/:pid", async (req, res) => {
  try {
    const pid = req.params.pid;
    const update = req.body;

    const updatedProducts = await productManager.setProductsById(pid, update);
    res.status(200).json({ message: "Producto actualizado", updatedProducts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//endpoints de carts
app.post( "/api/carts", async (req, res) => {
  try {
    const carts = await cartManager.addCart();
    res.status(201).json({ message: "Carrito agregado", carts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get( "/api/carts/:cid", async (req, res) => {
  try {
    const cid = req.params.cid;

    const cartProducts = await cartManager.getProductsByCartId(cid);
    res.status(200).json({ message: "Se muestran lista de productos", cartProducts });  
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(8080, ()=> {
  console.log("Servidor iniciado en el puerto 8080!");
});

