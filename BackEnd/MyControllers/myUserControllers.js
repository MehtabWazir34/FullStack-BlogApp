
import myUser from '../MyModels/UserModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const CreateAccount = async (req, res) => {
    console.log(req.body);
    
  try {
    const { fullName, userName, password, birthDay } = req.body || {};

    if (!fullName || !userName || !password || !birthDay) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await myUser.findOne({ userName });
    if (existingUser) {
      return res.status(409).json({ message: "Account already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await myUser.create({
      fullName,
      userName,
      birthDay,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    user.password = undefined;

    return res.status(201).json({
      success: true,
      token,
      user
    });

  } catch (error) {
    console.error("CreateAccount error ❌", error);
    return res.status(500).json({ message: error.message });
  }
};


const Login = async(req, res)=>{
    try {
        const {userName, password} = req.body;
        if(!userName || !password){
            return res.status(430).json({AlrMsg:"Required both"})
        };

        let theUser = await myUser.findOne({userName});
        if(!theUser){
            return res.status(430).json({AlrMsg:"No account, plx create first."})
        };
        let passwordMatch = await bcrypt.compare(password, theUser.password);
        if(!passwordMatch){
            return res.status(435).json({AlrMsg:'Bsdk ghalt password enter kiaa, try again'})
        };
        let token = jwt.sign({id: theUser._id}, 'myTokenKey123',{expiresIn: '7d'});
        // theUser.token = token;
        // await theUser.save();
        theUser.password = undefined;

        res.status(200).json({
            AlrMsg:"Logged in ✅",
            token,
            user :{
                fullName: theUser.fullName, 
                userName: theUser.userName,
                id: theUser._id
            }
        })
        
    } catch (error) {
        console.error("Login error ❌", error);
        return res.status(500).json({
        message: error.message
        });
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
        const {fullName, userName, birthDay} = req.body
        if(!req.user || !req.user._id){
            return res.status(420).json({AlrMsg:"Unauthorized"})
        };

        let updateTheUser = await myUser.findByIdAndUpdate(
            req.user._id,
            {fullName, userName, birthDay}, {new: true}
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