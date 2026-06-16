import jwt from "jsonwebtoken";
import User from "../models/user.model.js"

export const protectRoute = async (req,res,next) => {
    try{
        const token = req.cookies.SessionCookie;
        
        if(!token) return res.status(401).json({ message : "Unauthorized access"});
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded) return res.status(400).json({ message : "Unauthorized"});

        const user = await User.findById(decoded.UserId).select("-password");

        if(!user) return res.status(404).json({ message : "user not found"});

        req.user = user

        next()

    } catch(error){
        res.status(400).json({" server error" : error.message});
    }
};