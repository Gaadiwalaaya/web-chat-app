import User from "../models/user.model.js";
import bcrypt from "bcrypt"

import { generateToken } from "../lib/utils.js";


export const signup = async (req,res) => {

    const {fullName, email, password } = req.body;

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({ message : "Please fill all of the requiered fields"});
        };
        if(password.length < 6 ){
            return res.status(400).json({ message : "Password needs to be of 6 letters"})
        }

        const user = await User.findOne({email})

        if(user) return res.status(400).json({ message : "User already exists!"});

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            email,
            fullName,
            password:hashedPassword
        })

        if(newUser){
            generateToken(newUser._Id,res)
            await newUser.save();

            res.status(201).json({ message : "User Created Successfully :)"});
        }
        else return res.status(400).json("Invalid user data");

    } catch(error){
        res.status(400).json({ "server error" :  error.message });
    }
    

}

export const login = async (req,res) => {
    
    const {email, password } = req.body;
   try{
    if(!email || !password ) return res.status(400).json({ message : "Please fill all credentials"});

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({ message : "Invalid Credentials"});

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect){
        return res.status(400).json({ message : "Invalid Password"});
    }

    generateToken(user._Id,res)

    res.status(200).json({ message : "user found"});
    
   } catch(error){
        res.status(400).json({ "Server error" : error.message})
   }
}

export const logout = (req,res) =>{
    try{
        res.cookie("SessionCookie", "", {maxAge:0});
        res.status(200).json({
            message : "Loged Out Successfulliy"
        });
    } catch(error){
        res.status(400).json({ "server error" : error.message});
    }
}

export const updateProfile = async (req,res) => {
    try{
        const { profilePic } = req.body;
        const userId = req.user._id;

        if(profilePic) return res.status(400).json({ message : "Profile Pic is required"});

        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true});

        res.status(200).json({ message : "User profile Updated"});

    } catch(error){
        res.status(400).json({ "server error " : error.message });
    }

}

export const checkAuth = (req,res) => {
    try{
        res.status(200).json(req.user);
    } catch(error){
        res.status(404).json({ message : "Invalid User"})
    }
}