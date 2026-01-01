import { Router } from "express";
import { login, signup,profile,logout,  updateProfile, updateProfilePic, getUserById, searchUsers } from "../controller/user.controller.js";
import upload from "../config/multerConfig.js";
import authCheck from "../middlewares/authCheck.js";
// import SearchUser from "../../frontend/src/components/SearchUser.jsx";

const userRouter = Router()

userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.get("/profile", authCheck, profile)
userRouter.put("/update-profile", authCheck, updateProfile)
userRouter.put("/update-profile-pic", authCheck, upload.single("image"), updateProfilePic)
userRouter.get("/logout", authCheck, logout)
userRouter.get("/search", searchUsers)
userRouter.get("/:id", getUserById)


export default userRouter           