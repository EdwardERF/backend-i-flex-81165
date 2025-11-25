import fs from "fs/promises"
import crypto from "crypto"

class ProductManager {

  constructor(pathFile){
    this.pathFile = pathFile;
  }
  
  generateNewId(){
    return crypto.randomUUID();
  }
  
  async addProduct(newProduct){
    try {
      // Recuperar los productos desde el archivo json
      const fileData = await fs.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);

      const newId = this.generateNewId();

      const product = { id: newId, ...newProduct };
      products.push(product);

      // Guardamos productos en el json
      await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");
      return products;
    } catch (error) {
      throw new Error(`Error al añadir el nuevo producto: ${error.message}`);
    }
  }

  async getProducts(){
    try {
      const fileData = await fs.readFile(this.pathFile, "utf-8");
      const products = JSON.parse(fileData);

      return products;
    } catch (error) {
      throw new Error(`Error al traer los productos: ${error.message}`);
    }
  }
  
  async setProductsById(pid, updates){
    try {
      const products = await this.getProducts();

      const indexProduct = products.findIndex( (product) => product.id === pid );
      if (indexProduct === -1) throw new Error("Producto no encontrado");

      products[indexProduct] = { ...products[indexProduct], ...updates };

      // Guardamos productos en el json
      await fs.writeFile(this.pathFile, JSON.stringify(products, null, 2), "utf-8");
      return products;
    } catch (error) {
      throw new Error(`Error al actualizar un producto: ${error.message}`);
    }
  }

  async deleteProductById(pid){
    try {
      const products = await this.getProducts();

      const filteredProducts = products.filter( (product) => product.id !== pid );

      // Guardamos productos en el json
      await fs.writeFile(this.pathFile, JSON.stringify(filteredProducts, null, 2), "utf-8");
      return filteredProducts;

    } catch (error) {
      throw new Error(`Error al borrar un producto: ${error.message}`);
    }
  }
}

export default ProductManager;