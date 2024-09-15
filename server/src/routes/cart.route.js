import { Router } from "express";
import { secureRoute } from "../middlewares/secureroute.middleware.js";
import {
  addToCart,
  deleteCart,
  getCart,
  updateCart,
} from "../controllers/cart.controller.js";

const router = Router();

router
  .route("/")
  .get(secureRoute, getCart)
  .post(secureRoute, addToCart)
  .put(secureRoute, updateCart)
  .delete(secureRoute, deleteCart);
export default router;
