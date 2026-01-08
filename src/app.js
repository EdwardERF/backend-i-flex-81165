import express from "express";
import { engine } from "express-handlebars"
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

app.listen(8080, ()=> {
  console.log("Servidor iniciado en el puerto 8080!");
});

