import { Router } from "express";
import {
  newBlog,
  getBlogs,
  getMyBlogs,
  // editBlog,
  deleteBlog,
  blogDetail,
  updateBlog,
  getEditBlog,
} from "../MyControllers/myBlogControllers.js";
import authMiddleware from "../MyMiddleWare/myAuthCheck.js";
const blogRouter = Router();

//PROTECTED ROUTES
blogRouter.post("/newblogpost", authMiddleware, newBlog);         
blogRouter.get("/me", authMiddleware, getMyBlogs);    
blogRouter.get("/edit/:id", authMiddleware, getEditBlog);
blogRouter.put("/edit/:id", authMiddleware, updateBlog);
      
blogRouter.delete("/:id", authMiddleware, deleteBlog);  


//PUBLIC ROUTES

blogRouter.get("/", getBlogs);                         
blogRouter.get("/detail/:id", blogDetail);                     

export default blogRouter;
