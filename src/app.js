import express from "express";
import { engine } from "express-handlebars"
import ProductManager from "./productManager.js";
import CartManager from "./cartManager.js";
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";

const app = express();
// Habilitamos la carpeta public para archivos estaticos
app.use( express.static("public") );

// Habilitamos para que pueda utilizar archivos JSON
app.use(express.json());

// Habilitamos para poder recibir data desde formularios
app.use( express.urlencoded({ extended: true }) );

// handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//endpoints
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const cartManager = new CartManager("./src/carts.json");

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

app.post( "/api/carts/:cid/product/:pid", async (req, res) => {
  try {

    const cid = req.params.cid;
    const pid = req.params.pid;
    
    const carts = await cartManager.addProductToCart(cid, pid);
    res.status(201).json({ message: "Producto agregado a carrito", carts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(8080, ()=> {
  console.log("Servidor iniciado en el puerto 8080!");
});

