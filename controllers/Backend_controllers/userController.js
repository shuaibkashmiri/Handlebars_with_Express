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
            res.json({msg:"user created"})
        }
        
    } catch (error) {
        console.log(error)
    }
    
}

const handleLogin=async(req,res)=>{
   try {
    //seeding admin
    const AdminEmail="shoaib@gmail.com";
    const AdminPassword="12345"
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

        if(email===AdminEmail&&password===AdminPassword){
            res.redirect("/admin/dashboard");
        }else{
            res.redirect("dashboard")   
        }
       
    }
    
   
}
    catch (error) {
    console.log(error)
   }}


//    const getUserDetails=async(req,res)=>{
//     try {
//         const _id=req.user;
//         const findUser=await User.findById(_id);
//         if(_id){
//             res.json({user:findUser})
//         }
//     } catch (error) {
//         console.log(error)
//     }
//    }

   const editUser =async(req,res)=>{
    try {
     
        const { fullname, email,profilePicUrl} = req.body;
        const _id = req.user;
        const findUser = await User.findById(_id);
        console.log(findUser)
        if (findUser) {
            const editUser = await User.findByIdAndUpdate(_id,{
                email,
                fullname,
                profilePicUrl
              });
              if (editUser) {
                res.json({msg:"User details Updated Succesfully!"});
              } 
        }else{
            res.json({msg:"no User"})
        }

    } catch (error) {
        console.log(error)
    }
   }

module.exports={handleSignup,handleLogin,editUser};
