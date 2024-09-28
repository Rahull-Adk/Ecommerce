import { ResponseHandler } from "../lib/Responses/ResponseHandler.js";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ErrorHandler } from "../lib/Responses/ErrorHandler.js";
import { User } from "../models/user.model.js";

// Get My Profile Route
export const profileManage = async (req, res) => {
  if (req.method === "GET") {
    try {
      const userId = req.user;
      const user = await User.findById(userId).select("-password");

      if (!user) {
        throw new ErrorHandler("User not found", 404);
      }

      return res
        .status(200)
        .json(
          new ResponseHandler(user, "User profile fetched successfully", 200)
        );
    } catch (error) {
      if (error instanceof ErrorHandler) {
        return res
          .status(error.statusCode)
          .json(
            new ResponseHandler(null, error.message, error.statusCode, false)
          );
      }

      return res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const userId = req.user;
      const { username, email, fullName, oldPassword, newPassword } = req.body;
      const avatar = req.file;

      const userExists = await User.findOne({ _id: userId });
      if (!userExists) {
        throw new ErrorHandler("User not found", 404);
      }

      if (username || email) {
        const usernameExists = await User.findOne({
          $or: [{ username }, { email }],
        });

        if (usernameExists) {
          throw new ErrorHandler("Username or email already taken", 400);
        }
        userExists.username = username || userExists.username;
        userExists.email = email || userExists.email;
      }

      if (fullName) {
        userExists.fullName = fullName || userExists.fullName;
      }

      if ((oldPassword && !newPassword) || (!oldPassword && newPassword)) {
        throw new ErrorHandler("Please provide both old and new password", 400);
      }

      if (oldPassword && newPassword) {
        if (oldPassword === newPassword) {
          throw new ErrorHandler("Old and new password cannot be same", 400);
        }
        const isPasswordMatch = await userExists.comparePassword(oldPassword);
        if (!isPasswordMatch) {
          throw new ErrorHandler("Invalid old password", 400);
        }
        userExists.password = newPassword;
      }

      if (avatar) {
        if (userExists.avatar) {
          const publicStringPath = userExists.avatar
            .split("/")
            .pop()
            .split(".")[0];
          await cloudinary.uploader.destroy(publicStringPath);
        }
        try {
          const result = (await cloudinary.uploader.upload(avatar.path))
            .secure_url;
          userExists.avatar = result;
          fs.unlinkSync(avatar.path); // Clean up file after successful upload
        } catch (uploadError) {
          fs.unlinkSync(avatar.path);
          throw new ErrorHandler("Failed to upload avatar", 500);
        }
      }

      await userExists.save();
      return res
        .status(200)
        .json(new ResponseHandler({ user: userExists }, "Profile updated"));
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path); // Clean up file in case of error
      }
      if (error instanceof ErrorHandler) {
        return res
          .status(error.statusCode)
          .json(
            new ResponseHandler(null, error.message, error.statusCode, false)
          );
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  return res.status(405).json({ error: "Method not allowed" });
};

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) throw new ErrorHandler("User not found", 404);
    return res
      .status(200)
      .json(new ResponseHandler(user, "User profile fetched successfully"));
  } catch (error) {
    if (error instanceof ErrorHandler) {
      return res
        .status(error.statusCode)
        .json(
          new ResponseHandler(null, error.message, error.statusCode, false)
        );
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
