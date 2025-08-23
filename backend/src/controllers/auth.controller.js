import User from "../Models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { upsertStreamUser } from "../lib/stream.js";
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

       try {
        await upsertStreamUser({
            id:newUser._id.toString(),
            name:newUser.fullName,
            image:newUser.profilePic || " "
        })
        console.log(`Stream user created for ${newUser.fullName}`)
        
       } catch (error) {
        console.log("Error in upsertStreamUser",error)
        
       }
         

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

const onboard = async(req,res)=>{
    try{
        const userId = req.user._id;
        const {fullName,profilePic,bio,location,nativeLanguage,learningLanguage} = req.body;
        
        if(!fullName || !bio || !location || !nativeLanguage || !learningLanguage){
            return res.status(400).json({
                message: "All fields are required",
                missingFields: [
                    !fullName && "fullName",
                    !bio && "bio",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location",
                ].filter(Boolean),
            });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true,
        }, { new: true });

        if(!updatedUser){
            return res.status(404).json({message:"User not found while onboarding"});
        }
        //Todo we want to update the user info in stream
        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePic || " "
            });
            console.log(`Stream user updated for ${updatedUser.fullName}`)
        } catch (error) {
            console.error("Error while upserting user to Stream:", error);
            
        }
        
        res.status(200).json({
            success:true,
            user:updatedUser
        })
    }
    catch(error){
        console.log("Error in onboard controller",error);
    }
}




export {signup,login,logout,onboard}