import User from "../MyModels/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const CreateAccount = async (req, res) => {
  try {
    const { fullName, userName, password, birthDay } = req.body;

    if (!fullName || !userName || !password || !birthDay) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const normalizedUserName = userName.toLowerCase();

    const existingUser = await User.findOne({ userName: normalizedUserName });
    if (existingUser) {
      return res.status(409).json({ message: "Account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      userName: normalizedUserName,
      birthDay,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.password = undefined;

    return res.status(201).json({
      success: true,
      token,
      user,
    });

  } catch (error) {
    console.error("CreateAccount error ❌", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "Username and password required" });
    }

    const normalizedUserName = userName.toLowerCase();

    const user = await User.findOne({ userName: normalizedUserName });
    if (!user) {
      return res.status(404).json({ message: "Account not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.password = undefined;

    return res.status(200).json({
      success: true,
      token,
      user,
    });

  } catch (error) {
    console.error("Login error ❌", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const Logout = async (req, res) => {
  try {
    
    return res.status(200).json({
      message: "Logged out successfully",
    });

  } catch (error) {
    console.error("Logout error ❌", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const seeProfile = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error("Profile error ❌", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const upDateUserInfo = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { fullName, userName, birthDay } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        ...(fullName && { fullName }),
        ...(userName && { userName: userName.toLowerCase() }),
        ...(birthDay && { birthDay }),
      },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update error ❌", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
