import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import cloudinary from '../config/cloudirnary.js'
import jwt from "jsonwebtoken"
import fs from "fs";

const signup = async (req, res) => {
    try {
        const { username, fullName, dob, password } = req.body;

        if (!username || !fullName || !dob || !password) {
            return res.status(403).json({ mssg: "All fields are required" });
        }

        const alreadyCreated = await User.findOne({ username });
        if (alreadyCreated) {
            return res.status(411).json({ mssg: "Account already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            password: hashedPassword,
            fullName,
            dob
        });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "superSecret123", {
            expiresIn: "7d"
        });

        user.token = token;
        await user.save();

        user.password = undefined;

        res.status(200).json({
            mssg: "Account created successfully",
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ mssg: "Something went wrong" });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(403).json({ mssg: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ mssg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(411).json({ mssg: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "superSecret123", {
            expiresIn: "7d"
        });

        user.token = token;
        await user.save();

        user.password = undefined;

        res.status(200).json({
            mssg: "Login successful",
            token
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ mssg: "Something went wrong" });
    }
}

const logout = async (req, res) => {
    try {  
        const user = await User.findByIdAndUpdate(req.user._id, {token:""})

          res.status(200).json({
            mssg: "logout Successfully"
        })

    } catch (error) {
        res.status(500).json({
            mssg: "Something went wrong"
        })
    }
}

const profile = async (req, res) => {
    try {

        if (!req.user || !req.user._id) {
            return res.status(404).json({
                mssg: "unauthorized user"
            });
        }

        console.log("User ID:", req.user._id); // new ObjectId("...") is NORMAL

        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                mssg: "unauthorized user"
            });
        }

        return res.status(200).json({
            user
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mssg: "Something went wrong"
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { fullName, username, dob } = req.body;

        if (!req.user || !req.user._id) {
            return res.status(401).json({
                mssg: "Unauthorized usedr"
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { fullName, username, dob },
            { new: true }   // IMPORTANT: return updated user
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                mssg: "User not found"
            });
        }

        return res.status(200).json({
            user: updatedUser
        });

    } catch (error) {
        return res.status(500).json({
            mssg: "Something went wrong"
        });
    }
};

const updateProfilePic = async (req, res) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    if (!req.file?.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user-profile-images",
    });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { profileImage: result.secure_url },
      { new: true }
    ).select("-password");

    // Delete local upload safely
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(200).json({
      message: "Image uploaded successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const searchUsers = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(200).json([]);
    }

    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } },
        { fullName: { $regex: q, $options: "i" } },
      ],
    }).select("_id username fullName profilePic");

    res.status(200).json(users);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Search failed" });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id)
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // User stats
    const blogs = await Blog.find({ author: id });

    const blogCount = blogs.length;
    const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);
    const totalLikes = blogs.reduce((sum, b) => sum + (b.likes?.length || 0), 0);
    const totalComments = blogs.reduce(
      (sum, b) => sum + (b.comments?.length || 0),
      0
    );

    res.status(200).json({
      user: {
        ...user.toObject(),
        blogCount,
        totalViews,
        totalLikes,
        totalComments,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export { login, logout, signup, updateProfile, updateProfilePic, profile, getUserById}