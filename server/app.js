import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));
app.use(cors());
app.use(cookieParser());
