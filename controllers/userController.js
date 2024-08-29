const User =require("../models/userModel");
const bcrypt= require("bcrypt");
const {renderHandler}=require("../utils/utils")


const handleSignup=async(req,res)=>{
    const{fullname,email,password}=req.body;
    if(fullname!==""&& email!==""&& password!==""){
        const findUser=await User.findOne({email});
        if(!findUser){
            const hashpass=await bcrypt.hash(password,10);
            const newUser=await User.create({
                fullname,
                email,
                password:hashpass
            })
            if(newUser){
                res.render("signup.hbs",{success:"User Created Sucessfully"})
            }
        }else{
            res.render("signup.hbs",{message:"User Already Registered"})
        }
    }else{
        res.render("signup.hbs",{message:"All Credentials Required"})
    }
}

const handleLogin=async(req,res)=>{
   try {
    const {email,password}=req.body;
    if(email===""&&password===""){
        return renderHandler(res, 400 ,"All credentials Required!" , "login")
    }
    const findUser=await User.findOne({email});
    if(!findUser){
        return renderHandler(res,400,"No User Found","login")
    }
    const checkPass=await bcrypt.compare(password,findUser.password);
    if (!checkPass){
        return renderHandler(res,202,"Password Incorrect","login")
    }else{
        res.render("dashboard",{success:"Login Success",name:findUser.fullname})
    }
}
    catch (error) {
    console.log(error)
   }}

module.exports={handleSignup,handleLogin};
