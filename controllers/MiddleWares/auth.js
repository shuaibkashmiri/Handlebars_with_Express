const jwt=require("jsonwebtoken");
const {renderHandler}=require("../../utils/utils")
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

module.exports=isAuthenticated;