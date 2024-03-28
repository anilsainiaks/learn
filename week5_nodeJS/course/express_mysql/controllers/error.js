exports.get404=(req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,'views','pageNotFound.html'));
    res.status(404).render('pageNotFound',{pageTitle:"404",path:'404'});
};