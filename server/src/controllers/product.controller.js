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

export const getCategoryProduct = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category });
    if (products.length === 0) {
      throw new ErrorHandler(
        "No products related to this category was found",
        404
      );
    }
    return res
      .status(200)
      .json(new ResponseHandler(products, "Products fetched"));
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const images = req.files;

    if (
      [name, description, category].some(
        (field) => !field || field.trim() === ""
      ) ||
      price === undefined ||
      stock === undefined
    ) {
      throw new ErrorHandler("All fields are required", 400);
    }

    if (!images) {
      throw new ErrorHandler("Images are required", 400);
    }

    let uploadImage;
    try {
      uploadImage = await Promise.all(
        images.map(async (image) => {
          const result = await cloudinary.uploader.upload(image.path, {
            folder: "products",
          });
          fs.unlinkSync(image.path);
          return result;
        })
      );
    } catch (error) {
      images.forEach((image) => {
        if (fs.existsSync(image.path)) {
          fs.unlinkSync(image.path);
        }
      });
      throw new ErrorHandler(error.message, 500);
    }

    const secureUrl = uploadImage.map((image) => image.secure_url);
    const product = await Product.create({
      name,
      description,
      price,
      stock,
      category,
      images: secureUrl,
    });

    return res
      .status(201)
      .json(new ResponseHandler(product, "Product created"));
  } catch (error) {
    req.files.forEach((image) => {
      if (fs.existsSync(image.path)) {
        fs.unlinkSync(image.path);
      }
    });
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

export const reviewProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user;
    const { rating, comment } = req.body;
    if (!rating) throw new ErrorHandler("Rating is required", 400);

    const product = await Product.findById(id);
    if (!product) throw new ErrorHandler("Product not found", 404);

    const existingReview = product.reviews.find(
      (review) => review.user.toString() === userId.toString()
    );
    if (existingReview) {
      throw new ErrorHandler("You have already reviewed this product", 400);
    }
    product.reviews.push({ user: req.user, rating, comment });
    const sendProduct = await Product.findById(id).populate("reviews.user");
    await product.save();
    return res
      .status(200)
      .json(new ResponseHandler(sendProduct, "Review added"));
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const images = req.files;

    const product = await Product.findById(id);
    if (!product) throw new ErrorHandler("Product not found", 404);

    let uploadImage;
    if (images) {
      // Delete the old image from Cloudinary
      await Promise.all(
        product.images.map(async (image) => {
          const publicId = image.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        })
      );

      try {
        uploadImage = await Promise.all(
          images.map(async (image) => {
            const result = await cloudinary.uploader.upload(image.path, {
              folder: "products",
            });
            fs.unlinkSync(image.path); // Remove image from local after upload
            return result;
          })
        );
      } catch (error) {
        images.forEach((image) => {
          if (fs.existsSync(image.path)) {
            fs.unlinkSync(image.path);
          }
        });
        throw new ErrorHandler(error.message, 500);
      }

      product.images = uploadImage.map((image) => image.secure_url);
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

    // Delete product images from Cloudinary
    await Promise.all(
      product.images.map(async (image) => {
        const publicId = image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      })
    );

    await Product.findByIdAndDelete(id);
    return res.status(200).json(new ResponseHandler(null, "Product deleted"));
  } catch (error) {
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};
