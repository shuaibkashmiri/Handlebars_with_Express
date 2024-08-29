const express= require("express")
const path = require("path")
const xhbs =require("express-handlebars");
const bodyParser = require("body-parser");
const cookie = require("cookie-parser")
const { handleSignup, handleLogin } = require("./controllers/Backend_controllers/userController");
const connectDb = require("./utils/connectDb");
const { renderIndex, renderLogin, renderSignup, renderDashboard } = require("./controllers/page_controllers/pageController");
const isAuthenticated = require("./controllers/MiddleWares/auth");
require('dotenv').config();
const port=process.env.PORT;
const server = express()
// MiddleWares
server.use(express.static(path.join(__dirname,"public")))
server.use(bodyParser());
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




//Post routes for user
server.post("/signup",handleSignup)
server.post("/login",handleLogin)



server.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
    
})

connectDb()