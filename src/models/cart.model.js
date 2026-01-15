import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    product: 
    [
      {
        productId: String,
        quantity: Number
      }
    ]
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;