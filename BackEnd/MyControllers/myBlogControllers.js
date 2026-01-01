import Blog from "../model/blog.schema";
import User from "../model/user.model";

const newBlog = async(req, res)=>{
    try {
        const {title, description} = req.body;
        if(!title || !description){
            return res.status(402).json({
                AlrtMsg : 'Opps! All fields are required'
            });
        }
        //check auth
        if(!req.user || !req.user._id){
            return res.status(402).json({
                AlrtMsg : 'Opps! Unauthorized'
            });
        }

        const myNewBlog = await Blog.create(
            {title, description, write: req.user._id}
        );
        await User.findByIdAndUpdate(req.user._id, {$push:{blogs : myNewBlog}}, {new: true});
        res.status(200).json({AlrtMsg:"Blog added", myNewBlog})
    } catch (error) {
        
    }
}

const getBLogs = async(req, res)=>{
    try {
    const allBlogs = await Blog.find();
    if(!allBlogs){
        return res.status(402).json({AlrtMsg:"Not found"})
    };

    res.status(200).json({allBlogs})
        
    } catch (error) {
        console.error("Something wrong", error)
        
    }
};

const getMyBLogs = async(req, res)=>{
    try {
    const myBlogs = await User.findById(req.user._id).populate('blogs');
    if(!myBlogs){
        return res.status(402).json({AlrtMsg: 'Not found'});
    };
    res.status(200).json({AlrtMsg: "All your blogs are here"}, myBlogs)
        
    } catch (error) {
        console.error("Something wrong", error)
    }
}

const deleteBlog = async(req, res)=>{
    let blogId = req.param.id;
    if(!theBLog){
        return res.status(402).json({AlrtMsg:'Not found'})
    }
    let theBLog = await User.findByIdAndDelete(blogId);
    res.status(200).json({AlrtMsg:"Deleted"});
}


export {newBlog, getBLogs, getMyBLogs, deleteBlog}