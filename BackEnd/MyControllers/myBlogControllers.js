import myUser from "../MyModels/UserModel.js";
import myBlog from "../MyModels/myBlogModel.js";

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

        const myNewBlog = await myBlog.create(
            {title, description, write: req.user._id}
        );
        await myUser.findByIdAndUpdate(req.user._id, {$push:{blogs : myNewBlog}}, {new: true});
        res.status(200).json({AlrtMsg:"Blog added", myNewBlog})
    } catch (error) {
        
    }
}

const getBLogs = async(req, res)=>{
    try {
    const allBlogs = await myBlog.find();
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
    const myBlogs = await myUser.findById(req.user._id).populate('blogs');
    if(!myBlogs){
        return res.status(402).json({AlrtMsg: 'Not found'});
    };
    res.status(200).json({AlrtMsg: "All your blogs are here"}, myBlogs)
        
    } catch (error) {
        console.error("Something wrong", error)
    }
}

const deleteBlog = async(req, res)=>{
    let blogId = req.params.id;
    if(!theBLog){
        return res.status(402).json({AlrtMsg:'Not found'})
    }
    let theBLog = await myUser.findByIdAndDelete(blogId);
    res.status(200).json({AlrtMsg:"Deleted"});
}

const editBlog = async(req, res)=>{
    try {
        let blogId = req.params.id
        const {title, description} = req.body;
        if(!blogId){
            return res.status(402).json({AlrtMsg:"Error"})
        }

        const editedBlog = await myBlog.findByIdAndUpdate(blogId,
            {title, description}, {new:true}
        );
        if(!editedBlog){
            return res.status(402).json({AlrtMsg:"Error"})
        }

        res.status(200).json({AlrtMsg:"Blog edited"}, editedBlog)
        
    } catch (error) {
        console.error("Somthing happened wrong", error);
        return res.status(402).json({AlrtMsg:"Error"})
    }
}

const blogDetail = async(req, res)=>{
    try {
        let blogId = req.params.id;
        if(!blogId){
            return res.status(402).json({AlrtMsg:"Error"})
        };
        let theBlog = await myBlog.findById(blogId);
        if(!theBlog){
            return res.status(402).json({AlrtMsg:"Error"})
        }
        res.status(200).json({AlrtMsg:"Blog is here."}, theBlog)
    } catch (error) {
        console.error("Somthing happened wrong", error);
        return res.status(402).json({AlrtMsg:"Error"})
    }
}


export  {newBlog, getBLogs, getMyBLogs, deleteBlog, editBlog, blogDetail}