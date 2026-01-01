import { JsonWebTokenError } from "jsonwebtoken";
import User from "../model/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// import { login } from "../controller/user.controller";

const CreateAccount = async(req, res)=>{
    try {
        const {FUllName, UserName, Password, birthDay} = req.body;
        if(!FUllName || !UserName || !Password || !birthDay){
            return res.status(420).json({
                AlrMsg: 'Opps! All fields are requireds'
            })
        };
        let accountExts = await User.findOne({UserName});
        if(accountExts)
        {
           return res.status(503).json({
                AlrMsg: 'Plx login, account exists already'
            })
        }
        let hashedPassword = await bcrypt.hash(Password, 10);
        let theUser = await User.create({
            fullName, UserName, birthDay, password: hashedPassword
        });

        let token = await jwt.sign({id: theUser._id}, 'myTokenKey123',{ expiresIn: '7d'});
        theUser.token = token;
        await theUser.save();
        theUser.Password = undefined;
        res.status(200).json({AlrMsg:"Created ✅"})
        
    } catch (error) {
        console.error('SOmething wrong❌', error)
        return res.status(402).json({AlrMsg:"Error happened❌"})
    }
}

const Login = async(req, res)=>{
    try {
        const {UserName, password} = req.body;
        if(!UserName || !password){
            return res.status(430).json({AlrMsg:"Required both"})
        };

        let theUser = await User.findOne({username});
        if(!theUser){
            return res.status(430).json({AlrMsg:"No account, plx create first."})
        };
        let passwordMatch = await bcrypt.compare(password, theUser.password);
        if(!passwordMatch){
            return res.status(435).json({AlrMsg:'Bsdk ghalt password enter kiaa, try again'})
        };
        let token = jwt.sign({id: theUser._id}, 'myTokenKey123',{expiresIn: '7d'});
        theUser.token = token;
        await theUser.save();
        theUser.password = undefined;

        res.status(200).json({
            AlrMsg:"Logged in ✅"
        })
        
    } catch (error) {
        
    }
}

const Logout = async(req, res)=>{
    try {
        await User.findOneAndUpdate(req.user._id, {token:''})
        res.status(200).json({
            AlrMsg : 'Logged out ✅'
        })
    } catch (error) {
        console.error('Something wrong ❌', error)
        return res.status(430).json({AlrMsg: 'Something wrong❌'})
    }
}

const Profile = async(req, res) =>{
    try {
        if(!req.user || !req.user._id){
            return res.status(420).json({AlrMsg:"Unauthorized"})
        };

        let theUser = await User.findById(req.user._id).select('-password');
        if(!theUser){
            return res.status(420).json({AlrMsg:"Unauthorized"})
        };

        res.status(200).json({AlrMsg:'Got it', theUser})
    } catch (error) {
        console.error("Something wrong❌", error)
        return res.status(430).json({AlrMsg:"Something wrong bsdk ❌"})
    }
}

const upDateUserInfo = async(req, res)=>{
    try {
        const {fullName, username, birthDay} = req.body
        if(!req.user || !req.user._id){
            return res.status(420).json({AlrMsg:"Unauthorized"})
        };

        let updateTheUser = await User.findById(req.user._id,
            {fullName, username, birthDay}, {new: true}
        ).select('-password');
        if(!updateTheUser){
            return res.status(430).json({AlrMsg:"NOt found account"});
        };

        res.status(200).json({
            AlrMsg:"THe user updated✅",
            user: updateTheUser
        })
        
    } catch (error) {
        console.error("SOmething wrongbaby❌")
        return res.status(402).json({AlrMsg:"SOmething wrongbaby❌"})
    }
}


export {CreateAccount, Login, Logout, Profile, upDateUserInfo}