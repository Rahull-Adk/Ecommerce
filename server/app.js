import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.route.js";
import userRouter from "./src/routes/user.route.js";
import cartRouter from "./src/routes/cart.route.js";
import productRouter from "./src/routes/product.route.js";

export const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cors());
app.use(cookieParser());

// routes

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
