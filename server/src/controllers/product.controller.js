import { ResponseHandler } from "../lib/Responses/ResponseHandler.js";
import { v2 as cloudinary } from "cloudinary";
import { Product } from "../models/product.model.js";
import { ErrorHandler } from "../lib/Responses/ErrorHandler.js";
import fs from "fs";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      throw new ErrorHandler("No products found", 404);
    }
    return res
      .status(200)
      .json(new ResponseHandler(products, "Products fetched"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const image = req.file;

    if (
      [name, description].some((field) => !field || field.trim() === "") ||
      price === undefined ||
      stock === undefined
    ) {
      throw new ErrorHandler("All fields are required", 400);
    }

    if (!image) {
      throw new ErrorHandler("Image is required", 400);
    }

    const uploadImage = await cloudinary.uploader.upload(image.path, {
      folder: "products",
    });

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      image: uploadImage.secure_url,
    });

    return res
      .status(201)
      .json(new ResponseHandler(product, "Product created"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      throw new ErrorHandler("Product not found", 404);
    }

    return res
      .status(200)
      .json(new ResponseHandler(product, "Product fetched"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const image = req.file;

    const product = await Product.findById(id);

    if (!product) throw new ErrorHandler("Product not found", 404);

    if (image) {
      // Delete the old image from Cloudinary
      const publicId = product.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
      try {
        const uploadImage = await cloudinary.uploader.upload(image.path, {
          folder: "products",
        });
        product.image = uploadImage.secure_url;
        fs.unlinkSync(image.path);
      } catch (error) {
        fs.unlinkSync(image.path);
        return res
          .status(500)
          .json({ message: error.message || "Internal server error" });
      }
    }

    // Update fields if new values are provided
    if (name && name !== product.name) product.name = name;
    if (description && description !== product.description)
      product.description = description;
    if (price !== undefined && price !== product.price) product.price = price;
    if (stock !== undefined && stock !== product.stock) product.stock = stock;

    await product.save();

    return res
      .status(200)
      .json(new ResponseHandler(product, "Product updated"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) throw new ErrorHandler("Product not found", 404);

    // Delete product image from Cloudinary
    const publicId = product.image.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId);

    await Product.findByIdAndDelete(id);

    return res.status(200).json(new ResponseHandler(null, "Product deleted"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};
