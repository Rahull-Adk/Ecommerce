import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Product name is required"],
    },
    image: {
      type: String,
      trim: true,
      required: [true, "Product image is required"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price must be a positive number"], // Ensure price is positive
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock cannot be negative"], // Ensure stock is not negative
      default: 0, // Default stock to 0 if not provided
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
