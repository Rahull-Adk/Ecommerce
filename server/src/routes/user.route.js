import { Router } from "express";
import { secureRoute } from "../middlewares/secureroute.middleware.js";
import { getProfile, profileManage } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";

const router = Router();

router
  .route("/profile")
  .get(secureRoute, profileManage)
  .put(secureRoute, upload.single("avatar"), profileManage);
router.get("/profile/:id", getProfile);

export default router;
