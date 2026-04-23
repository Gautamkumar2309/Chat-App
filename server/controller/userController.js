import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";

export const signup = async (req, res) => {
    const{fullName, email,password,bio} = req.body;

    try{
        if(!fullName || !email || !bio){
            return res.json({success: false, message:"Missing Details"})
        }
        const user = await User.findOne({email});

        if(user){
            return res.json({success: false, message: "Account already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUSer = await User.create({
            fullName,email,password: hashedPassword,bio
        });

        const token = generateToken(newUSer._id)

        res.json({sucess: true, userData: newUser, token,message: "Account Created successfully"})

    }catch(error){
        console.log(error.message);
        res.json({sucess: false, userData: newUser, token,
        message: error.message})
    }
}

//controller to login user
export const login = async (req, res) =>{
    try{
        const{email,password} = req.body;
        const userData = await User.findOne({email})

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);
        if(!isPasswordCorrect){
            return res.json({success: false, message: "Invalid credentials"});
        }
        const token = generateToken(newUSer._id)

        res.json({sucess: true, userData: token, token, message: "Login Successful"})
    }catch(error){
        console.log(error.message);
        res.json({sucess: false, message: error.message})
    }
}

//controler to check if user is authenticated
export const checkAuth = (req, res)=>{
    res.json({sucess: true, user: req.user});
}