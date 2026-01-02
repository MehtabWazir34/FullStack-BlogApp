import mongoose from "mongoose";
const myBlogSchemaModel = new mongoose.Schema({
    title : {
        type : String, require: true
    },
    description : {
        type : String, require: true
    },
    writer: {
        type : mongoose.Schema.Types.ObjectId,
        require: true,
        ref : 'user'
    },
    likes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comment'
    }],
    blogImg:{
        type: String,
        require: true
    }
}, {timestamps: true});

let myBlog = mongoose.model("myBlogModel", myBlogSchemaModel);
export default myBlog