import User from "../model/user.model.js"
import jwt from "jsonwebtoken"

const authCheck = async (req, res, next) => {
    try {
        const header = req.headers["authorization"];

        if (!header || !header.startsWith("Bearer ")) {
            return res.status(403).json({ mssg: "Invalid Credentials" });
        }

        const token = header.split(" ")[1];
        if (!token) {
            return res.status(403).json({ mssg: "Invalid Credentials" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "superSecret123");
        if (!decoded) {
            return res.status(403).json({ mssg: "Invalid Credentials" });
        }

        // Find user by ID from token
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(403).json({ mssg: "Invalid Credentials" });
        }

        req.user = user;
        
        next();
    } catch (error) {
        return res.status(403).json({ mssg: "Invalid or expired token" });
    }
};

export default authCheck