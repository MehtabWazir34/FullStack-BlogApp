import { Router } from "express";
import {
  CreateAccount,
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

export default userRouter;
