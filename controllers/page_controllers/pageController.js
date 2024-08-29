const renderIndex=(req,res)=>{
    res.render("index.hbs")
}

const renderSignup=(req,res)=>{
    res.render("signup.hbs")
}

const renderLogin=(req,res)=>{
    res.render("login.hbs")
}


//secure Pages

const renderDashboard=(req,res)=>{
    res.render("dashboard.hbs")
}

module.exports={renderIndex,renderSignup,renderLogin,renderDashboard}