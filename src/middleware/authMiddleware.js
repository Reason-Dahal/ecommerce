import jsonwebtoken from "jsonwebtoken";
import User from "../model/userModel.js";

export const protect = async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        try {
            token = req.headers.authorization.split(' ')[1];
            const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
           

            req.user = await User.findById(decode.id).select("-Password");
            next();
            
        } catch (error) {
            res.status(401);
            next(new Error("not authorized token"));
        }

    }
};

export const admin = async(req,res, next)=>{
    if(req.user && req.user.role === 'admin'){
        next();
    }
    else{
        res.status(403);
        next(new Error("not authorized as admin"));
    }
}