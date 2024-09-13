import connectDb from "./src/lib/db/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";
import { v2 as cloudinary } from "cloudinary";
dotenv.config();

const PORT = process.env.PORT || 3000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
