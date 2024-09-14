import { Router } from "express";
import { secureRoute } from "../middlewares/secureroute.middleware.js";
import { upload } from "../middlewares/multer.js";
import { adminCheck } from "../middlewares/admin.middleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getCategoryProduct,
  getSingleProduct,
  reviewProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = Router();

router
  .route("/")
  .get(getAllProducts)
  .post(secureRoute, upload.array("images", 10), adminCheck, createProduct);
router.get("/category/:category", getCategoryProduct);
router
  .route("/:id")
  .post(secureRoute, reviewProducts)
  .get(getSingleProduct)
  .put(secureRoute, adminCheck, upload.array("images", 10), updateProduct)
  .delete(secureRoute, adminCheck, deleteProduct);

export default router;
