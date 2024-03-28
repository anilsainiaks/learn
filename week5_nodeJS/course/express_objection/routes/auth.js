const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const {check, body} = require('express-validator');
const User = require('../models/user');

router.get('/login',authController.getLogin);

router.post('/login',authController.postLogin);

router.post('/logout',authController.postLogout);

router.get('/signup',authController.getSignup);

router.post('/signup',[
    check('email')
    .isEmail()
    .custom((value,{req})=>{
        return User.query().findOne({email:value})
        .then(result=>{
            if(result){
                return Promise.reject('E-mail already exists'); 
            }
        })
    }),
    body('password','Please enter a password with only numbers and text and atleast 5 characters long')
    .isLength({min:5})
    .isAlphanumeric()
    .trim(),
    body('cnfPassword').custom((value,{req})=>{
        if(value!==req.body.password){
            throw new  Error('Passwords do not Match');
        }else{
            return true;
        }
    })
],authController.postSignup);

router.get('/resetPassword',authController.getForgotPassword);

router.post('/resetPassword',authController.postForgotPassword);

router.get('/newPassword/:token',authController.getNewPassword);

router.post('/newPassword',[
    body('password','Please enter a password with only numbers and text and atleast 5 characters long')
    .isLength({min:5})
    .isAlphanumeric()
    .trim(),
    body('cnfPassword').custom((value,{req})=>{
        if(value!==req.body.password){
            throw new Error('Passwords do not Match');
        }else{
            return true;
        }
    })
],authController.postNewPassword);

module.exports=router;