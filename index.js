const express= require("express")
const port =5000;
const path = require("path")
const xhbs =require("express-handlebars");
const bodyParser = require("body-parser");
const { handleSignup, handleLogin } = require("./controllers/userController");
const connectDb = require("./utils/connectDb");
const server = express()
// MiddleWares
server.use(express.static(path.join(__dirname,"public")))
server.use(bodyParser());

server.engine("hbs", xhbs.engine({
    extname:"hbs",
    defaultLayout: "layout",
    layoutsDir:path.join(__dirname,"views","layouts"),
    partialsDir:path.join(__dirname,"views","partials"),
}))

server.set('view engine', 'hbs')
server.set("views",path.join(__dirname,"views","pages"))


server.get("/",(req,res)=>{
    res.render("index.hbs")
})
server.get("/login",(req,res)=>{
    res.render("login.hbs")
})  
server.get("/signup",(req,res)=>{
    res.render("signup.hbs")
})

server.get("/dashboard",(req,res)=>{
    res.render("dashboard.hbs")
})




//Post routes for user
server.post("/signup",handleSignup)
server.post("/login",handleLogin)



server.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
    
})

connectDb()