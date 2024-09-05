const express= require("express")
const path = require("path")
const xhbs =require("express-handlebars");
const bodyParser = require("body-parser");
const cookie = require("cookie-parser")
const { handleSignup, handleLogin, editUser } = require("./controllers/Backend_controllers/userController");
const connectDb = require("./utils/connectDb");
const { renderIndex, renderLogin, renderSignup, renderDashboard, adminDashboard,logOutHandler, renderAddProduct, products } = require("./controllers/page_controllers/pageController");
const {isAuthenticated, isAdmin} = require("./MiddleWares/auth");
const multmid =require("./MiddleWares/multer");
const { handleCreateProduct } = require("./controllers/Backend_controllers/productController");
require('dotenv').config();
const port=process.env.PORT;
const server = express()

// MiddleWares
server.use(express.static(path.join(__dirname,"public")))
server.use(bodyParser.urlencoded({extended :false}) );
server.use(express.json())
server.use(cookie())

server.engine("hbs", xhbs.engine({
    extname:"hbs",
    defaultLayout: "layout",
    layoutsDir:path.join(__dirname,"views","layouts"),
    partialsDir:path.join(__dirname,"views","partials"),
}))

server.set('view engine', 'hbs')
server.set("views",path.join(__dirname,"views","pages"))


server.get("/",renderIndex)
server.get("/login",renderLogin)  
server.get("/signup",renderSignup)

server.get("/dashboard",isAuthenticated,renderDashboard)
server.get("/logout",isAuthenticated,logOutHandler)
server.get("/admin/dashboard",isAuthenticated,isAdmin,adminDashboard)
//Post routes for user
server.post("/signup",handleSignup)
server.post("/login",handleLogin)

//Put routes for user
server.put("/user/edit",isAuthenticated,editUser);


//Product Routes
server.post("/products/add",multmid,handleCreateProduct);
server.get("/product/add",isAuthenticated,isAdmin,renderAddProduct)
server.get("/products",products)

server.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
    
})

connectDb()