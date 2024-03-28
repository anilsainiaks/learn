const User = require('../models/user');
const db = require('../util/database');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
const {validationResult} = require('express-validator');
const { error } = require('console');


dotenv.config();
db();
const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    auth:{
        user:process.env.EMAIL,
        pass:process.env.AUTH_KEY
    }
});

exports.getLogin = (req,res,next) =>{
    // const isLoggedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    let message = req.flash('error');
    if(message.length===0){
        message=undefined;
    }
    res.render('auth/login',{
        pageTitle:'Login Page',
        path:'/login',
        username:'GUEST',
        errorMessage:message
    })
}

exports.postLogin=(req,res,next)=>{
    // res.setHeader('Set-Cookie','loggedIn=true');
    const email = req.body.email;
    const password = req.body.password;
    User.query().findOne({
        email:email
    })
    .then(user=>{
        if(!user){
            req.flash('error','No user Present')
            return res.redirect('/login')
        }
        
        bcrypt.compare(password,user.password)
        .then(doMatch=>{
            if(!doMatch){
                req.flash('error','Wrong Password')
                return res.redirect('/login');
            }
            req.session.isLoggedIn=true;
            req.session.user=user;
            return res.redirect('/')
        })
        .catch(err=>{
            console.log(err);
            res.redirect('/login')
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postLogout = (req,res,next)=>{
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/')
    })
}

exports.getSignup=(req,res,next)=>{
    res.render('auth/signup',{
        pageTitle:'Signup Page',
        isAuthenticated:false,
        path:'/signup',
        username:'GUEST',
        errorMessage:null,
        oldInput:{email:'',name:''}
    })
}

exports.postSignup = (req,res,next)=>{
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).render('auth/signup',{
            pageTitle:'Signup Page',
            isAuthenticated:false,
            path:'/signup',
            username:'GUEST',
            errorMessage:errors.array()[0].msg,
            oldInput:{email:email,name:name}
        })
    }

    User.query().findOne({email:email})
    .then(user=>{
        return bcrypt.hash(password,12)
        .then(hashedPassword=>{
            return User.query().insert({
                name:name,
                email:email,
                password:hashedPassword
            });
        })
        .then(()=>{
            return transporter.sendMail({
                to:email,
                from:process.env.EMAIL,
                subject : 'Successfull Sign Up',
                html:'<h1> Successfully created an account</h1>'
            })
        })
        .then(result=>{
            res.redirect('/login');
        });
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getForgotPassword = (req,res,next)=>{
    let message = req.flash('resetErr');
    if(message.length===0){
        message=undefined;
    }
    res.render('auth/reset',{
        pageTitle:'Password Reset',
        path:'/forgotPassword',
        isAuthenticated:false,
        username:'GUEST',
        errorMessage:message
    })
};

exports.postForgotPassword = (req,res,next)=>{
    const email = req.body.email;
    User.query().findOne({
        email:email
    })
    .then(user=>{
        if(!user){
            req.flash('error','No user present');
            return res.redirect('/resetPassword');
        }
        crypto.randomBytes(32, async (err,buffer)=>{
            if(err){
                return res.redirect('/reset');
            }
            const token = buffer.toString('hex');
            user.resetToken = token;
            user.resetTokenExpiration = String(Date.now() + 3600000);

            await user.$query().patch();
            transporter.sendMail({
                to:email,
                from:process.env.EMAIL,
                subject:'RESET PASSWORD',
                html:`<h1>You have requested for password reset </h1>   <p> To reset <a href="http://localhost:3000/newPassword/${token}">click here</a> </p>`
            })
        })
        return res.redirect('/');
    })
    .catch(err=>{
        console.log(err);
    })
};

exports.getNewPassword = async(req,res,next) =>{
    const token = req.params.token;
    const user = await User.query().findOne({
        resetToken : token
    });
    if(Number(user.resetTokenExpiration) < Date.now()){
        req.flash('resetErr','Link Expired');
        return res.redirect('/resetPassword')
    }
    let message = req.flash('err');
    if(message.length===0){
        message=undefined;
    }
    res.render('auth/newPassword',{
        pageTitle:'New Password',
        path:'/newPassword',
        token:token,
        isAuthenticated:false,
        username:'GUEST',
        errorMessage:null
    });
}

exports.postNewPassword = (req,res,next) =>{
    const password = req.body.password;
    const cnfPassword = req.body.cnfPassword;
    const token = req.body.token;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).render('auth/newPassword',{
            pageTitle:'New Password',
            path:'/newPassword',
            token:token,
            isAuthenticated:false,
            username:'GUEST',
            errorMessage:errors.array()[0].msg
        })
    }
    User.query().findOne({
        resetToken:token
    })
    .then(async user=>{
        const hashedPassword =await bcrypt.hash(password,12);
        user.password = hashedPassword;
        await user.$query().patch();
        req.flash('error','Password changed successfully');
        return res.redirect('/login');
    })
    .catch(err=>{
        console.log(err);
    })
}