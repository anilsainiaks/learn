const express=require('express');
const router=express.Router();
const adminData=require('./addUsers');

router.get('/',(req,res,next)=>{
    const users=adminData.users;
    res.render('users',{
        pageTitle:'Users',
        users:users
    })
})

module.exports=router;