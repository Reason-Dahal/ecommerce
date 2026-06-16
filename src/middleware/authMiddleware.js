import jsonwebtoken from "jsonwebtoken";
import User from "../model/userModel.js";

// Protect routes - verifies JWT and attaches user to req.user

export const protect = async (req, res, next) => {
  let token;

  try {
    // Check if Authorization header exists
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // If no token found
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token provided",
      });
    }

    // Verify token
    const decoded = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET
    );

    // Get user from DB (exclude password)
    const user = await User.findById(decoded.id).select(
      "-password"
    );

    // If user not found
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

// Admin middleware - only allows admin users
 
export const admin = (req, res, next) => {
  try {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({
        message: "Not authorized as admin",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Server error in admin middleware",
    });
  }
};