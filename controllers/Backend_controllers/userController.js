const User =require("../../models/userModel");
const bcrypt= require("bcrypt");
const jwt=require("jsonwebtoken")
const {renderHandler}=require("../../utils/utils")
require('dotenv').config();
const secretKey=process.env.SECRET_KEY;


const handleSignup=async(req,res)=>{
    try {
        const {fullname,email,password}=req.body;

        console.log(req.body)
        if(fullname==="" || email==="" || password===""){
            return renderHandler(res,400,"All Credentials Required","signup")
        }
        const findUser=await User.findOne({email});
        if(findUser){
            return renderHandler(res,400,"User Already Registered","signup")
        }

        const hashpass=await bcrypt.hash(password,10);
        const newUser=await User.create({
            fullname,
            email,
            password:hashpass
        });
        if(newUser){
            res.render("signup",{success:"User Created Sucessfully"})
        }
        
    } catch (error) {
        console.log(error)
    }
    
}

const handleLogin=async(req,res)=>{
   try {
    const {email,password}=req.body;
    if(email===""|| password===""){
        return renderHandler(res, 400 ,"All credentials Required!" , "login")
    }
    const findUser=await User.findOne({email});
    if(!findUser){
        return renderHandler(res,400,"No User Found!","login")
    }
    const checkPass=await bcrypt.compare(password,findUser.password);
    if (!checkPass){
        return renderHandler(res,202,"Password Incorrect","login")
        
    }
    const token=await jwt.sign({_id:findUser._id},secretKey);
    if(token){
        res.cookie("token",token);
        res.redirect("dashboard")
    }
    
   
}
    catch (error) {
    console.log(error)
   }}


   const getUserDetails=async(req,res)=>{
    try {
        const _id=req.user;
        const findUser=await User.findById(_id);
        if(_id){
            res.json({user:findUser})
        }
    } catch (error) {
        console.log(error)
    }
   }

module.exports={handleSignup,handleLogin,getUserDetails};
