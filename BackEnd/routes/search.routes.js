// const express = require("express");
// const router = express.Router();
// const User = require("../models/User");

// router.get("/search", async (req, res) => {
//   try {
//     const { q } = req.query;

//     if (!q) {
//       return res.status(400).json({ message: "Search query required" });
//     }

//     const users = await User.find({
//       $or: [
//         { username: { $regex: q, $options: "i" } },
//         { fullName: { $regex: q, $options: "i" } }
//       ]
//     }).select("username fullName");

//     res.json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;

import { Router } from "express";
import User from "../model/user.model.js";
import authCheck from "../middlewares/authCheck.js";

const searchRouter = Router();

/**
 * GET /user/search?q=
 * Search users by username or full name
 */
searchRouter.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = await User.find({
      $or: [
        { username: { $regex: q, $options: "i" } },
        { fullName: { $regex: q, $options: "i" } },
      ],
    })
      .select("username fullName profilePic")
      .limit(10);

    res.status(200).json(users);
  } catch (error) {
    console.error("User search error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default searchRouter;
