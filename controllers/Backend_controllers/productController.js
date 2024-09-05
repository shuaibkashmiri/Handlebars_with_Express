const {messageHandler}=require("../../utils/utils");
const User=require("../../models/userModel");
const Product=require("../../models/product");
const cloudinary = require("cloudinary").v2;
const { config } = require("dotenv");
config("/.env");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const handleCreateProduct=async(req,res)=>{
    try {
        const {title,description,price}=req.body;
        const image=req.file.path;
        if((title||title!=="") &&(description||description!=="")&&(price||price!=="")&&(image||image!=="")){
            const upload=await cloudinary.uploader.upload(image);
            if(upload){
                const productImageUrl=upload.secure_url;
                const newProduct =await Product.create({title,description,price,productImageUrl});
                res.render("addproducts",{message:"Product Added Sucessfully"})
            }
        }

        
    } catch (error) {
        console.log(error)
    }
}


module.exports={handleCreateProduct}