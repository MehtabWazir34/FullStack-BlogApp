import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlog, getMyBlogs, updateBlog, updateblogImg } from "../controller/blog.controller.js";
import upload from "../config/multerConfig.js";
import authCheck from "../middlewares/authCheck.js";

const blogRouter = Router()

blogRouter.post("/create", authCheck, createBlog)
blogRouter.put("/update/:id", authCheck, updateBlog)
blogRouter.put("/image/:id", authCheck, upload.single("blogImg"), updateblogImg);
blogRouter.delete("/delete/:id", authCheck, deleteBlog)
blogRouter.get("/blogs", getAllBlogs)
blogRouter.get("/my-blogs", authCheck, getMyBlogs) // 
blogRouter.get("/blog/:id", authCheck, getBlog) // 


export default blogRouter; 

