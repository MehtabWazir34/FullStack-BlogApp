import mongoose from "mongoose";
const myCommentSchema = new mongoose.Schema({
    CommentTexts:{
        type : String, require: true
    }, 
    CommentOn:
        {type: mongoose.Schema.Types.ObjectId, ref: 'blog'}
    ,
    CommentBy:{
        type: mongoose.Schema.Types.ObjectId, ref: 'user'
    },

}, {timestamps: true});
const myComment = mongoose.model('myCommentsModel', myCommentSchema);
export default myComment