import express from "express";
import { engine } from "express-handlebars"
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import http from "http";
import connectMongoDB from "./config/db.js";
import dotenv from "dotenv";
import __dirname from "../dirname.js";
import { errorHandler } from "./middlewares/error.middleware.js";

// Se inicializan las variables de entorno
dotenv.config({ path: __dirname + "/.env" });

const app = express();

// Variable de entorno
const PORT = process.env.PORT || 8080;

connectMongoDB();

const server = http.createServer(app);

// Habilitamos la carpeta public para archivos estaticos
app.use( express.static(__dirname + "/public") );

// Habilitamos para que pueda utilizar archivos JSON
app.use(express.json());

// Habilitamos para poder recibir data desde formularios
app.use( express.urlencoded({ extended: true }) );

// handlebars config
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/src/views");

//endpoints
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// Inicializo el middleware de error
app.use(errorHandler);

server.listen(PORT, ()=> {
  console.log("Servidor iniciado en el puerto 8080!");
});

