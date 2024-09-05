const path = require("path");
const User = require("../../models/userModel")
const Product=require("../../models/product")
const cookie = require("cookie-parser");

const renderIndex=(req,res)=>{
    res.render("index.hbs")
}

const renderSignup=(req,res)=>{
    res.render("signup.hbs")
}

const renderLogin=(req,res)=>{
    res.render("login.hbs")
}

const logOutHandler=async(req,res)=>{

    res.clearCookie("token");
    res.redirect("login")
}

//secure Pages

const renderDashboard= async (req,res)=>{
    try {
        const _id =req.user

        res.render("dashboard");
    } catch (error) {
        console.log(error)
    }
    
}

const renderAddProduct= async (req,res)=>{
    try {
        res.render("addproducts");
    } catch (error) {
        console.log(error)
    }
    
}

const adminDashboard=async(req,res)=>{
    
res.render("adminDashboard")
}


const products=async(req,res)=>{
    const data =await Product.find().lean();
    res.render("products",{products:data})
    }
    

module.exports={renderIndex,renderSignup,renderLogin,renderDashboard,adminDashboard,logOutHandler,renderAddProduct,products}