import User from "../model/user.model";
import { jwt } from "jsonwebtoken";
const myAuthCheck = async(req, res, next)=>{
    try {
        let header = req.headers['authorization'];
        if(!header || !header.startsWith("Bearer")){
            return res.status(420).json({AlrtMsg:"Error"});
        };

        let token = header.split('');
        if(!token){
            return res.status(420).json({AlrtMsg:"Error"})
        }
        
        let verifyToken = jwt.verify(token, 'myTokenKey123');
        if(!verifyToken){
            return res.status(420).json({AlrtMsg:"Error"})
        };
        
        let user = await User.findById(verifyToken.id).select("-password");
        if(!user){
            return res.status(420).json({AlrtMsg:"Error"})
        };


        req.user = user;
        next();

    } catch (error) {
        console.error("SOmething wrong happen❌", error);
        return res.status(420).json({AlrtMsg:"Error happened"})
    }
}
export default myAuthCheck