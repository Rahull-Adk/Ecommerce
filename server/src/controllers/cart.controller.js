import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { ErrorHandler } from "../lib/Responses/ErrorHandler.js";
import { ResponseHandler } from "../lib/Responses/ResponseHandler.js";
import { Cart } from "../models/cart.model.js";

export const getCart = async (req, res) => {
  try {
    const userId = req.user;
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new ErrorHandler("Cart not found", 404);
    return res.status(200).json(new ResponseHandler(cart, "Cart found"));
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { products } = req.body; // Array of products with productId and quantity
    if (!products || !Array.isArray(products)) {
      throw new ErrorHandler("Products array is required", 400);
    }
    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) throw new ErrorHandler("User not found", 404);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await Cart.create({ user: userId });
    }

    // Loop through each product in the request body
    for (const productData of products) {
      const { productId, quantity } = productData;
      if (!quantity)
        throw new ErrorHandler("Quantity is required for each product", 400);

      const product = await Product.findById(productId);
      if (!product)
        throw new ErrorHandler(`Product not found for ID: ${productId}`, 404);

      const cartItemIndex = cart.items.findIndex((item) => {
        return item.products.toString() === productId.toString();
      });

      // If the product is already in the cart, update the quantity
      if (cartItemIndex > -1) {
        cart.items[cartItemIndex].quantity += quantity;
      } else {
        // Otherwise, add the product to the cart
        cart.items.push({
          products: productId,
          quantity,
          price: product.price,
        });
      }
    }

    // Recalculate total price after adding/updating items
    const total = cart.items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
    cart.totalAmount = total;

    await cart.save();
    return res.status(200).json(new ResponseHandler(cart, "Cart updated"));
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const updateCart = async (req, res) => {
  try {
    const { products } = req.body;
    console.log(products);
    // Validate that the request contains a valid products array
    if (!products || !Array.isArray(products) || products.length === 0) {
      throw new ErrorHandler("Products array is required", 400);
    }

    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) throw new ErrorHandler("User not found", 404);

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      throw new ErrorHandler("Cart not found", 404);
    }

    // Clear the current items in the cart before updating
    cart.items = [];

    // Loop through each product in the request body
    for (const productData of products) {
      const { productId, quantity } = productData;

      // Validate that productId and quantity are provided
      if (!productId) throw new ErrorHandler("Product ID is required", 400);
      if (quantity === undefined || quantity < 0) {
        throw new ErrorHandler("Invalid quantity for product", 400);
      }

      // Find the product in the database
      const product = await Product.findById(productId);
      if (!product)
        throw new ErrorHandler(`Product with ID ${productId} not found`, 404);

      // Add or update the product in the cart
      cart.items.push({
        products: productId,
        quantity,
        price: product.price,
      });
    }

    // Recalculate the total amount
    const total = cart.items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);

    cart.totalAmount = total;

    // Save the updated cart
    await cart.save();

    // Send back the updated cart
    return res
      .status(200)
      .json(new ResponseHandler(cart, "Cart updated successfully"));
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const deleteCart = async (req, res) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    if (!user) throw new ErrorHandler("User not found", 404);

    const cart = await Cart.findOneAndDelete({ user: userId });
    if (!cart) throw new ErrorHandler("Cart not found", 404);
    return res.status(200).json(new ResponseHandler(null, "Cart deleted"));
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};
