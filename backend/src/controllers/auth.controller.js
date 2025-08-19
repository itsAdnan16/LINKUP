import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const signup = async (req,res)=>{
    const {email,password,fullName} = req.body;
    try{
        if(!email || !password || !fullName){
            return res.status(400).json({message:"All fields are required"})
        }
        if(password.length<6){
            return res.status(400).json({message:"password must be 6 characters long"})
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        const idx = Math.floor(Math.random()*100)+1;
        const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            fullName,
            email,
            password,
            profilePic:randomAvatar,
        })

        if(!newUser){
            return res.status(500).json({message:"Failed to create new user something went wrong "})
        }

        const token = jwt.sign({userId:newUser._id},process.env.JWT_SECRET_KEY,
            {expiresIn:"1d"}
        )

        //TODO : also verify the user on stream
         

        res.cookie("jwt", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true, // prevent XSS attacks
            sameSite: "strict", // prevent CSRF attacks
            secure: process.env.NODE_ENV == "production"
          })
          .status(201)
          .json({
            success:true,
            message:"New user created successfully",
            user:newUser
          })
          

    }
    catch(error){
        console.log("Error in signup controller",error)
        res.status(500).json({
            message:"Internal server error while signing up"
        })
    }
}




const login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.status(401)
            .json({message: "Invalid email or password"})  // Fixed syntax
        }

        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect){
            return res.status(401)
            .json({message: "Invalid Password"})  // Fixed syntax
        }

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,  // Fixed: user._id not newUser._id
            {expiresIn:"1d"}
        )

        res.cookie("jwt", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV == "production"
          })
          .status(200)  // Changed from 201 to 200 for login
          .json({
            success:true,
            message:"User logged in successfully",
            user:user  // Fixed: user not newUser
          })

    }
    catch(error){
        console.log("Error in login controller ",error)  // Fixed typo
        return res.status(500)
        .json({
            message:"Internal server error while logging in"
        })
    }
}

// ... existing logout function ...

const logout = async (req,res)=>{
    res.clearCookie("jwt")
    .status(200)
    .json({
        success:true,
        message:"User logged out successfully"
    })
}



export {signup,login,logout}