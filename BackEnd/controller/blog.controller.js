import cloudinary from "../config/cloudirnary.js"
import Blog from "../model/blog.schema.js";
import User from "../model/user.model.js";
import fs from "fs"; 


const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;        

        if (!title || !content) {
            return res.status(400).json({
                mssg: "All fields are required"
            });
        }

        // ✅ SAFE CHECK
        if (!req.user || !req.user._id) {
            return res.status(401).json({
                mssg: "Unauthorized user"
            });
        }

        
        const blog = await Blog.create({
            title,
            content,
            author: req.user._id
        });
        
            await User.findByIdAndUpdate(
            req.user._id,
            { $push: { blogs: blog._id } },
            { new: true }
            );        

        res.status(201).json({
            mssg: "Blog Created Successfully",
            blog
        });

    } catch (error) {
        console.error("CREATE BLOG ERROR:", error);
        res.status(500).json({
            mssg: error.message
        });
    }
};

const getBlog = async (req, res) => {
    try {
        const blogId = req.params.id;

        // ✅ FIX: Proper validation + return
        if (!blogId) {
            return res.status(400).json({
                mssg: "Blog ID is required"
            });
        }

        const blog = await Blog.findById(blogId);

        // ✅ FIX: Proper not-found handling
        if (!blog) {
            return res.status(404).json({
                mssg: "Blog not found"
            });
        }

        res.status(200).json({ blog });

    } catch (error) {
        res.status(500).json({
            mssg: "Something went wrong"
        });
    }
};

const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();

        // ❌ FIX: Blog.find() always returns array, not null
        res.status(200).json({ blogs });

    } catch (error) {
        res.status(500).json({
            mssg: "Something went wrong"
        });
    }
};

const getMyBlogs = async (req, res) => {
    try {
        const myBlogs = await User
            .findById(req.user._id)
            .populate("blogs");

        // ✅ FIX: Proper not-found handling
        if (!myBlogs) {
            return res.status(404).json({
                mssg: "User not found"
            });
        }

        res.status(200).json({ myBlogs });

    } catch (error) {
        res.status(500).json({
            mssg: "Something went wrong"
        });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const { title, content } = req.body;

        // ✅ FIX: Missing validation
        if (!blogId) {
            return res.status(400).json({
                mssg: "Blog ID is required"
            });
        }

        // ✅ FIX: new:true returns updated document
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { title, content },
            { new: true }
        );

        // ✅ FIX: Handle not found
        if (!updatedBlog) {
            return res.status(404).json({
                mssg: "Blog not found"
            });
        }

        // ❌ FIX: Wrong variable name (updateBlog ❌)
        res.status(200).json({
            mssg: "Blog Updated Successfully",
            updatedBlog // ✅ FIX
        });

    } catch (error) {
        res.status(500).json({
            mssg: "Something went wrong"
        });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;

        if (!blogId) {
            return res.status(400).json({
                mssg: "Blog ID is required"
            });
        }

        const deletedBlog = await Blog.findByIdAndDelete(blogId);

        // ✅ FIX: Handle not found
        if (!deletedBlog) {
            return res.status(404).json({
                mssg: "Blog not found"
            });
        }

        res.status(200).json({
            mssg: "Blog deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            mssg: "Something went wrong"
        });
    }
};

const updateBlogImage = async (req, res) => {
    try {
        const blogId = req.params.id;

        // ❌ FIX: Condition was wrong
        if (!blogId) {
            return res.status(400).json({
                mssg: "Blog ID is required"
            });
        }

        const file = req.file;

        // ✅ FIX: Proper file validation
        if (!file) {
            return res.status(400).json({
                mssg: "No file uploaded"
            });
        }

        // ✅ Upload image to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "blog-images"
        });

        // ✅ FIX: new:true returns updated blog
        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            { blogImage: result.secure_url },
            { new: true }
        );

        // ✅ Delete local file
        fs.unlinkSync(file.path);

        res.status(200).json({
            mssg: "Image uploaded successfully",
            updatedBlog
        });

    } catch (error) {
        res.status(500).json({
            mssg: "Something went wrong"
        });
    }
};

export {
    deleteBlog,
    updateBlog,
    createBlog,
    getAllBlogs,
    getBlog,
    getMyBlogs,
    updateBlogImage
};
