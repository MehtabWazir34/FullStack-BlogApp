const mongoose = require('mongoose');
const myBlogSchemaModel = new mongoose.Schema({
    Title : {
        type : String, require: true
    },
    Description : {
        type : String, require: true
    },
    Writer: {
        type : mongoose.Schema.Types.ObjectId,
        require: true,
        ref : 'user'
    },
    Likes : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    Comments:[{
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