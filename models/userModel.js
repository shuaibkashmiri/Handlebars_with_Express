const mongoose =require("mongoose");

const User=mongoose.model("User",{
    fullname:String,
    email:String,
    password:String,
    profilePicUrl:String,
    isVerified:Boolean

})

module.exports=User