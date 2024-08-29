const mongoose =require ("mongoose");
require('dotenv').config();
const url=process.env.MONGO_URL;

const connectDb=async ()=>{
    const connection =await mongoose.connect(url)
    if(connection){
        console.log("DB Connected ")
    }else{
        console.log("Some Error")
    }
}

module.exports=connectDb;