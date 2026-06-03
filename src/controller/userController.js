import User from "../model/userModel.js";

export const registerUser = async(req,res)=>{
    try {
        const{username,email,password} = req.body;
        if(!username || !email || ! password){
            return res.status(404).send({message:"please enter all the feild"});
        }
        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(400).send({message:"email already exist"});
        }

        const user = new User({
            username: username,
            email:email,
            password:password,
        })
        await user.save();
        return res.status(201).send({message:"account created sucessfully"});


    } catch (error) {
        res.status(500).send({message:error});
        console.error(error);
        
    }
}