import jwt from "jsonwebtoken";
import User from "../MyModels/UserModel.js";
// import { dotenv } from "dotenv";
// dotenv.config()
const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Extract token from: "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach only required data
    req.user = {
      id: user._id,
      userName: user.userName,
    };

    next();

  } catch (error) {
    console.error("Auth middleware error ❌", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
