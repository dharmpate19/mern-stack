const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


//@Desc Register User
//@route /user/register/
const registerUser = asyncHandler(async (req,res) => {
    const {userName, email, password} =  req.body;
    if(!userName || !email || !password) {
         res.status(400);
         throw new Error("All fields are required")
    } 
        const userExist = await User.findOne({email});
        if(userExist){
            res.status(500)
            throw new Error("Email already exist")
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            userName, email, password : hashedPassword
        })
        if(user) {
        res.status(201).json({id : user._id, userName : user.userName, email : user.email})
        } else {
        res.status(400)
        throw new Error("User data is not valid")
        }
    
});

//@Desc login User
//@route /user/login/
const loginUser = asyncHandler(async (req,res) => {
    const {email, password} =  req.body;
    if(!email || !password) {
         res.status(400);
         throw new Error("All fields are required")
    } 
    const user = await User.findOne({email});
    if(!user) {
        res.status(404)
        throw new Error("User is not Registered")
    }
    const verifyPassword = await bcrypt.compare(password , user.password)
    if(!verifyPassword) {
         res.status(401);
         throw new Error("Invalid Credential")
    } 
    const token = jwt.sign({user : {userId : user._id, userName : user.userName, email : user.email}}, process.env.SECRET_KEY, {expiresIn : "1h"} );
    res.cookie("token", token, {
        httpOnly : true,
        secure : false,
        sameSite : "lax"
    }).json({message : "User Logged in", token : token})
});

//@Desc Current User Info
//@route /user/current/
const currentUser = asyncHandler(async (req,res,next) => {
    res.json(req.user)
});


module.exports = { registerUser, loginUser, currentUser }