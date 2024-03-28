const express=require('express');
const router=express.Router();
const shopController=require('../controllers/shop');
const { route } = require('./admin');

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/cart',shopController.getCart);
router.get('/cart/:productId',shopController.postCart);
router.post('/cart/deleteItem',shopController.postdeleteCartItem);

router.get('/orders',shopController.getOrders);

router.get('/checkout',shopController.getCheckout);

router.get('/products/:productId',shopController.getProduct);

module.exports=router;