const jwt=require("jsonwebtoken");
const {renderHandler}=require("../utils/utils")
require('dotenv').config();

const secretKey=process.env.SECRET_KEY;

const isAuthenticated=async(req,res,next)=>{
   try {
    const {token}=req.cookies;
    if(!token){
        return renderHandler(res,401,"Unauthorized Please Login","login")
    }
    await jwt.verify(token,secretKey,(error,resolve)=>{
        if(error){
            return renderHandler(res,403,"Not verified login again","login")
        }
        req.user=resolve._id
        return next()
    })
    
   } catch (error) {
    console.log(error)
   }
}

const isAdmin =async(req,res,next)=>{
const userId =req.user;
// seeding id of admin

if(userId !=="66d5f65bda1abf2dda1ffbaf"){
    return renderHandler(res,401,"Unauthorised to Access","login")
}else{
    return next()
}
}



module.exports={isAuthenticated, isAdmin}