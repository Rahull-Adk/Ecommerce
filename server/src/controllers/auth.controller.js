import { ErrorHandler } from "../lib/Responses/ErrorHandler.js";
import { ResponseHandler } from "../lib/Responses/ResponseHandler.js";
import { User } from "../models/user.model.js";

// Register Route
export const register = async (req, res) => {
  try {
    const { username, email, password, fullName } = req.body;

    if (!username || !email || !password || !fullName) {
      throw new ErrorHandler("Please provide all values", 400);
    }

    const userExists = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists) throw new ErrorHandler("User already exists", 400);

    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(email)) throw new ErrorHandler("Invalid Email", 400);

    if (password.length < 6) {
      throw new ErrorHandler("Password must be at least 6 characters", 400);
    }

    const user = await User.create({ username, email, password, fullName });
    if (!user) throw new ErrorHandler("User registration failed", 500);

    const sendUser = await User.findById(user._id).select("-password");

    return res
      .status(201)
      .json(new ResponseHandler(sendUser, "User registered successfully"));
  } catch (error) {
    console.log(`Error at register controller: ${error.message}`);

    if (error instanceof ErrorHandler) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw new ErrorHandler("Please provide all values", 400);
    }

    const user = await User.findOne({ username });
    if (!user) throw new ErrorHandler("User not found", 404);

    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) throw new ErrorHandler("Invalid credentials", 400);

    const token = await user.generateToken();

    const sendUser = await User.findById(user._id).select("-password");

    return res
      .cookie("token", token, { httpOnly: true })
      .status(200)
      .json(new ResponseHandler(sendUser, "User logged in successfully"));
  } catch (error) {
    console.log(`Error at login controller: ${error.message}`);

    if (error instanceof ErrorHandler) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json({ message: "User logged out successfully" });
};
