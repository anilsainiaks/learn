

exports.getLogin = (req,res,next) =>{
    const isLoggedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    res.render('auth/login',{
        pageTitle:'Login Page',
        path:'/login',
        isAuthenticated:isLoggedIn
    })
}

exports.postLogin=(req,res,next)=>{
    res.setHeader('Set-Cookie','loggedIn=true');
    res.redirect('/');
}