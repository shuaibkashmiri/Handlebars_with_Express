const User = require("../../models/userModel")

const renderIndex=(req,res)=>{
    res.render("index.hbs")
}

const renderSignup=(req,res)=>{
    res.render("signup.hbs")
}

const renderLogin=(req,res)=>{
    res.render("login.hbs")
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

const adminDashboard=async(req,res)=>{
    
res.render("adminDashboard")
}

module.exports={renderIndex,renderSignup,renderLogin,renderDashboard,adminDashboard}