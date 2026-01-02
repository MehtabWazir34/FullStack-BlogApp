import { Router } from "express";
import { blogDetail, deleteBlog, editBlog, getMyBLogs, newBlog, getBLogs } from "../MyControllers/myBlogControllers.js";
import myAuthCheck from "../MyMiddleWare/myAuthCheck.js";


const myBlogRouters = Router();

myBlogRouters.post("/addblog", myAuthCheck , newBlog);
myBlogRouters.put('/editblog/:id', myAuthCheck, editBlog);
myBlogRouters.delete('/deleteblog/:id', myAuthCheck, deleteBlog);
myBlogRouters.get('/allblogs', getBLogs);
myBlogRouters.get('/myblogs', myAuthCheck, getMyBLogs);
myBlogRouters.get('/blog-details/:id', blogDetail)

export default myBlogRouters