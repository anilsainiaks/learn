const express=require('express');
const { use } = require('./users');
const router=express.Router();
const users=[];

router.get('/addUser',(req,res,next)=>{
    res.render('addUsers',{
        pageTitle:'Add Users'
    })
})

router.post('/addUsers',(req,res,next)=>{
    users.push(req.body.name);
    res.redirect('/');
})

exports.users=users;
exports.routes=router;