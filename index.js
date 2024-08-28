const express= require("express")
const port =5000;
const path = require("path")
const xhbs =require("express-handlebars")
const server = express()
// MiddleWares
server.use(express.static(path.join(__dirname,"public")))

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
server.listen(port,()=>{
    console.log(`Server is Running on port ${port}`);
    
})