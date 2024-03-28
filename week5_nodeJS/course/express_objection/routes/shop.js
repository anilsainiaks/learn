const express=require('express');
const router=express.Router();
const shopController=require('../controllers/shop');
const { route } = require('./admin');
const loginStatus = require('../middleware/is-auth');
const isAuth = require('../middleware/is-auth');

router.get('/',shopController.getIndex);

router.get('/products',shopController.getProducts);

router.get('/cart',loginStatus,shopController.getCart);
router.get('/cart/:productId',loginStatus,shopController.postCart);
router.post('/cart/deleteItem',loginStatus,shopController.postdeleteCartItem);

router.get('/orders',loginStatus,shopController.getOrder);

router.post('/order-items',loginStatus,shopController.postOrder);

router.get('/checkout',isAuth,shopController.getCheckout);

router.get('/checkout/success',shopController.postOrder);

router.get('/checkout/cancel',shopController.getCheckoutCancel);

router.get('/products/:productId',shopController.getProduct);

router.get('/orders/:orderId',isAuth,shopController.getInvoice);


module.exports=router;