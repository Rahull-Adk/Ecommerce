import { ErrorHandler } from "../lib/Responses/ErrorHandler.js";
import jwt from "jsonwebtoken";

export const secureRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new ErrorHandler("Unauthorized access", 401);
    }
    const decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedInfo) {
      throw new ErrorHandler("Unauthorized access", 401);
    }
    req.user = decodedInfo._id;
    next();
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
