import { Router } from "express";
import {
  CreateAccount,
  deleteAccount,
  Login,
  Logout,
  seeProfile,
  upDateUserInfo,
} from "../MyControllers/myUserControllers.js";
import authMiddleware from "../MyMiddleWare/myAuthCheck.js";

const userRouter = Router();

userRouter.post("/register", CreateAccount);
userRouter.post("/login", Login);


//PROTECTED ROUTES
userRouter.get("/profile", authMiddleware, seeProfile);
userRouter.put("/updateprofile", authMiddleware, upDateUserInfo);
userRouter.post("/logout", authMiddleware, Logout);
userRouter.delete('/delete-account/:id', authMiddleware, deleteAccount)

export default userRouter;
