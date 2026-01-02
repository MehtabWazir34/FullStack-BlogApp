
import myUser from '../MyModels/UserModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const CreateAccount = async(req, res)=>{
    try {
        const {fullName, UserName, Password, birthDay} = req.body;
        if(!fullName || !UserName || !Password || !birthDay){
            return res.status(420).json({
                AlrMsg: 'Opps! All fields are requireds'
            })
        };
        let accountExts = await myUser.findOne({UserName});
        if(accountExts)
        {
           return res.status(503).json({
                AlrMsg: 'Plx login, account exists already'
            })
        }
        let hashedPassword = await bcrypt.hash(Password, 10);
        let theUser = await myUser.create({
            fullName, UserName, birthDay, password: hashedPassword
        });

        let token = await jwt.sign({id: theUser._id}, 'myTokenKey123',{ expiresIn: '7d'});
        theUser.token = token;
        await theUser.save();
        theUser.Password = undefined;
        res.status(200).json({AlrMsg:"Created ✅"})
        
    } catch (error) {
        console.log('SOmething wrong❌', error)
        return res.status(402).json({AlrMsg:error.message})
        
    }
}

const Login = async(req, res)=>{
    try {
        const {UserName, password} = req.body;
        if(!UserName || !password){
            return res.status(430).json({AlrMsg:"Required both"})
        };

        let theUser = await myUser.findOne({username});
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
        await myUser.findOneAndUpdate(req.user._id, {token:''})
        res.status(200).json({
            AlrMsg : 'Logged out ✅'
        })
    } catch (error) {
        console.error('Something wrong ❌', error)
        return res.status(430).json({AlrMsg: 'Something wrong❌'})
    }
}

const seeProfile = async(req, res) =>{
    console.log('Hello check');
    
    try {
        if(!req.user || !req.user._id){
            return res.status(420).json({AlrMsg:"Unauthorized"})
        };

        let theUser = await myUser.findById(req.user._id).select('-password');
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

        let updateTheUser = await myUser.findById(req.user._id,
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


export { Login, Logout, seeProfile, upDateUserInfo}