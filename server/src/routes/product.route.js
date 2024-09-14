import { Router } from "express";
import { secureRoute } from "../middlewares/secureroute.middleware.js";
import { upload } from "../middlewares/multer.js";
import { adminCheck } from "../middlewares/admin.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(secureRoute, upload.single("image"), adminCheck, createProduct);

router
  .route("/:id")
  .get(getSingleProduct)
  .put(secureRoute, adminCheck, upload.single("image"), updateProduct)
  .delete(secureRoute, adminCheck, deleteProduct);

export default router;
