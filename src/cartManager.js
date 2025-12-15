import fs from "fs/promises"
import crypto from "crypto"

class CartManager {

  constructor(pathFile) {
    this.pathFile = pathFile;
  }
  
  generateNewId(){
    return crypto.randomUUID();
  }
  
  async addCart(){
    try {
      // Recuperar los carritos desde el archivo json
      const fileData = await fs.readFile(this.pathFile, "utf-8");
      const carts = JSON.parse(fileData);

      const newId = this.generateNewId();
      const cartProducts = [];

      const cart = { id: newId, products: cartProducts };
      carts.push(cart);

      // Guardamos carrito en el json
      await fs.writeFile(this.pathFile, JSON.stringify(carts, null, 2), "utf-8");
      return carts;
    } catch (error) {
      throw new Error(`Error al añadir el nuevo carrito: ${error.message}`);
    }
  }

   async getProductsByCartId(cid){
    try {
      // Recuperar los carritos desde el archivo json
      const fileData = await fs.readFile(this.pathFile, "utf-8");
      const carts = JSON.parse(fileData);

      const cart = carts.find(c => c.id == cid);

      return cart.products;
    } catch (error) {
      throw new Error(`Error al mostrar productos de carrito: ${error.message}`);
    }
  }
  
}

export default CartManager;