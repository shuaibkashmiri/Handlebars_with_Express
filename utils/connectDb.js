const { log } = require("handlebars");
const mongoose =require ("mongoose");

const connectDb=async ()=>{
    const connection =await mongoose.connect("mongodb://localhost:27017/hbs")
    if(connection){
        console.log("Db Connected")
    }else{
        console.log("some Error")
    }
}

module.exports=connectDb;