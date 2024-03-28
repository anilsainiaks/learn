const express=require('express');
const router=express.Router();
const adminController=require('../controllers/admin');
const loginStatus = require('../middleware/is-auth');
const {body} = require('express-validator');

router.get('/add-product',loginStatus,adminController.getAddProduct);

router.get('/products',loginStatus,adminController.getProducts);

router.post('/add-product',[
    body('title')
    .trim(),
    // body('imgUrl')
    // .isURL(),
    body('price')
    .isNumeric(),
    body('description')
    .trim()
    .isLength({min:10,max:100})
],loginStatus,adminController.postAddProduct);

router.get('/edit-product/:productId',loginStatus,adminController.getEditProduct);

router.post('/edit-product',[
    body('title')
    .trim(),
    // body('imgUrl')
    // .isURL(),
    body('price')
    .isNumeric(),
    body('description')
    .trim()
    .isLength({min:10,max:100})
],loginStatus,adminController.postEditProduct);

router.delete('/product/:productId',loginStatus,adminController.deleteProduct);

module.exports=router;