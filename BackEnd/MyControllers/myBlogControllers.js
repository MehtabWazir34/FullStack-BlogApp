import mongoose from "mongoose";
import User from "../MyModels/UserModel.js";
import Blog from "../MyModels/myBlogModel.js";

export const newBlog = async (req, res) => {
  try {
    const { title, description, blogImg } = req.body;

    if (!title || !description || !blogImg) {
      return res.status(400).json({
        message: "Title, description, and image are required",
      });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const blog = await Blog.create({
      title,
      description,
      blogImg,
      writer: req.user.id,
    });

    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { blogs: blog._id } },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.error("Create blog error ❌", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("writer", "fullName userName profilePic")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });

  } catch (error) {
    console.error("Get blogs error ❌", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const getMyBlogs = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const blogs = await Blog.find({ writer: req.user.id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: blogs.length,
      blogs,
    });

  } catch (error) {
    console.error("Get my blogs error ❌", error);
    return res.status(500).json({ message: "Internal server error",
      Error: error.message
     });
  }
};

export const blogDetail = async (req, res) => {
  const blogId = req.params.id;
  if(!mongoose.Types.ObjectId.isValid(blogId)){
    return res.status(401).json({message :'Invalide Id.'})
  }
  try {

    const blog = await Blog.findById(blogId)
      .populate("writer")
      // .populate("userName")
      // .populate("comments");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.error("Blog detail error ❌", error);
    return res.status(500).json({ message: "Internal server error" , Err: error.message });
  }
};

export const editBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, description, blogImg } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // authCheck
    if (blog.writer !== req.user.id) {
      return res.status(403).json({ message: `Forbbiden! ${error.message}` });
    }

    blog.title = title ?? blog.title;
    blog.description = description ?? blog.description;
    blog.blogImg = blogImg ?? blog.blogImg;

    await blog.save();

    return res.status(200).json({
      success: true,
      blog,
    });

  } catch (error) {
    console.error("Edit blog error ❌", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    //authcheck
    if (Blog.writer !== req.user._id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await Blog.findByIdAndDelete(blogId);

    await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { blogs: blogId } }
    );

    return res.status(200).json({
      success: true,
      message: "Blog deleted successfully",
    });

  } catch (error) {
    console.error("Delete blog error ❌", error);
    return res.status(500).json({ message: `Internal error, ${error.message}` });
  }
};
