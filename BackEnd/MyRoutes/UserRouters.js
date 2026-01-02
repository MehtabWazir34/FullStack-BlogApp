import { Router } from "express";
import { CreateAccount, Login, Logout, seeProfile, upDateUserInfo } from "../MyControllers/myUserControllers.js";
import myAuthCheck from "../MyMiddleWare/myAuthCheck.js";

const myUserRouters = Router();

myUserRouters.post('/create-account', CreateAccount);
myUserRouters.post('/login-to-account', Login);
myUserRouters.get('/profile', myAuthCheck, seeProfile);
myUserRouters.put('/logout-account', myAuthCheck, Logout);
myUserRouters.put('/edit-profile', myAuthCheck, upDateUserInfo);

export default myUserRouters