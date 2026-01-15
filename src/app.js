import express from "express";
import { engine } from "express-handlebars"
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { Server } from "socket.io";
import http from "http";
import ProductManager from "./productManager.js";
import connectMongoDB from "./config/db.js";
import dotenv from "dotenv";
import __dirname from "../dirname.js";

// Se inicializan las variables de entorno
dotenv.config({ path: __dirname + "/.env" });

const productManager = new ProductManager(__dirname + "/src/products.json");

const app = express();

// Variable de entorno
const PORT = process.env.PORT || 8080;

connectMongoDB();

const server = http.createServer(app);
//websocket
const io = new Server(server);

// Habilitamos la carpeta public para archivos estaticos
app.use( express.static(__dirname + "/public") );

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




//websocket - Creo servidor
io.on("connection", async (socket)=> {
  console.log("Nuevo usuario conectado");

  const productsList = await productManager.getProducts();
  
  //emitimos un evento desde el servidor al cliente
  socket.emit("productsList", productsList);

  //escuchamos un evento
  socket.on("new message", (data)=> {
    messages.push(data);
    console.log(messages);

    io.emit("broadcast new message", data);
  });

  socket.on("new-product", async (data) => {
    await productManager.addProduct(data);

    const updatedProducts = await productManager.getProducts();
    io.emit("productsList", updatedProducts);
  });

  socket.on("delete-product", async (productId) => {
    try {
      await productManager.deleteProductById(productId);

      const updatedProducts = await productManager.getProducts();
      io.emit("productsList", updatedProducts);
    } catch (error) {
      console.error(error.message);
    }
  });

});

server.listen(PORT, ()=> {
  console.log("Servidor iniciado en el puerto 8080!");
});

