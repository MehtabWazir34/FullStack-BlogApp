import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text:{
        type: String,
        required: true,
    },
    commentBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    commentOn:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    },
}, {timestamps: true})

const Blog  = mongoose.model("Blog", commentSchema);
export default Blog;