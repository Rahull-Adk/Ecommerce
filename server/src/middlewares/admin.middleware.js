import { ErrorHandler } from "../lib/Responses/ErrorHandler.js";
import { User } from "../models/user.model.js";

export const adminCheck = async (req, res, next) => {
  try {
    console.log("req.user", req.user);
    const user = await User.findById(req.user);
    console.log("User", user);
    if (!user || !user.isAdmin) {
      throw new ErrorHandler("Only Admin can access this route", 401);
    }
    next();
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
