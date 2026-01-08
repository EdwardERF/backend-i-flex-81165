import express from "express";
import { engine } from "express-handlebars"
import viewsRouter from "./routes/views.router.js";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/carts.router.js";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
//websockets
const io = new Server(server);

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

//websockets desde el servidor
io.on("connection", (socket)=> {
  console.log("Nuevo usuario conectado");
  //emitimos un evento desde el servidor al cliente
  socket.emit("message history", messages);

  //escuchamos un evento
  socket.on("new message", (data)=> {
    messages.push(data);

    io.emit("broadcast new message", data);
  });

});

app.listen(8080, ()=> {
  console.log("Servidor iniciado en el puerto 8080!");
});

