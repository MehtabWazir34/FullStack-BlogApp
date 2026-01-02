import mongoose from "mongoose";

const UserSchemaModel = new mongoose.Schema({
    fullName : {
        type: String,
        require : true
    },
    UserName : {
        type : String,
        require: true,
        unique : true
    },
    password : {
        type: String, require: true
    },
    birthDay : {
        type: Date, require: true
    },
    profilePic : { type: String},
    Blogs : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Blog'
        }
    ],
    Followers:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'user',
    }],
    Followings:[{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    VerificationStatus :{
        type: Boolean, default: false
    }
    
}, {timestamps: true});

let myUser = mongoose.model('UserModel', UserSchemaModel);
export default myUser