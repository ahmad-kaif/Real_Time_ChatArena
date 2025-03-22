import bcrypt from "bcryptjs"
import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";


export const signup = async (req,res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error: "Passwords do not match"})
        }
        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error: "Username already exists"})
        }

        //hash Password here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        // https://avatar-placeholder.iran.liara.run/  -- this api gives placeholder avatars

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser =  await User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender ==="male" ? boyProfilePic : girlProfilePic
        })
       if(newUser){
        //generate JWT Token here
        generateTokenAndSetCookie(newUser._id,res);

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        })

       }else{
        return res.status(400).json({error: "Inavlid USer data"})
       }

    } catch (error) {
        console.log("Error in sign up controller", error.message);
        res.status(500).json({error: "Internal server error"})
    }
}

export const login = async (req,res) => {
    try {
        const {username, password} = req.body;
        // console.log('Received login request:', { username, password });
        const user = await User.findOne({username});
        if(!user){
            res.status(400).json({error: "Inavlid username"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid password" });
        }

        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
        })


    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }

}

export const logout = (req,res) => {
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json("Logged out successfully")
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal server error"});
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // Remove password field
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
