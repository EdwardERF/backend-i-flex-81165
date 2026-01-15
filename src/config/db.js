import mongoose, { connect } from "mongoose";

// Creamos conexion a MongoDB
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGODB);
    console.log("Conectado con MongoDB");
  } catch (error) {
    console.error("Error al conectar con MongoDB");
    // Se mata el servidor en caso de error.
    process.exit(1);
  }
}

export default connectMongoDB;