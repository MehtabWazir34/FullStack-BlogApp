import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlog, getMyBlogs, updateBlog, updateBlogImage } from "../controller/blog.controller.js";
import upload from "../config/multerConfig.js";
import authCheck from "../middlewares/authCheck.js";

const blogRouter = Router()

blogRouter.post("/create", authCheck, createBlog)
blogRouter.put("/update/:id", authCheck, updateBlog)
blogRouter.put("/image/:id", authCheck, upload.single("blogImage"), updateBlogImage);
blogRouter.delete("/delete/:id", authCheck, deleteBlog)
blogRouter.get("/blogs", getAllBlogs)
blogRouter.get("/my-blogs", authCheck, getMyBlogs) // 
blogRouter.get("/blog/:id", authCheck, getBlog) // 


export default blogRouter; 

