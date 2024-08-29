const renderHandler=(res,statusCode,message , page)=>{
    return res.status(statusCode).render(`${page}` , {message : message});
}

module.exports={renderHandler};