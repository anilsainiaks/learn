const Product=require('../models/product');
const Order = require('../models/order');
const Cart = require('../models/cart');
const db =require('../util/database');
const User = require('../models/user');
const CartItem = require('../models/cartItem');
const OrderItem = require('../models/orderItem');
const { afterRead } = require('@popperjs/core');
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');
const stripe = require('stripe')('sk_test_51OzCkBSBx2YpACrt9klfELXtiUnemMTV0F4d0uZqxkvlvz6Tgo0dv1Mq34WVpA9l7jNtijiIyF48xSTWheD1kufD00VHFIZQXD');
db();
const ITEMS_PER_PAGE = 4;
exports.getProducts=(req,res,next)=>{
    const page = +req.query.page || 1;
    let username;
    if(req.session.isLoggedIn){
        username=req.user.name
    }else{
        username='GUEST'
    }
    db();
    let totalProducts;
    Product.query()
    .then(products=>{
        totalProducts = products.length;
    })
    Product.query()
    .offset((page-1)*ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .then(result=>{
        res.render('shop/product-list',{
            prods:result,
            pageTitle:'All Products',
            path:'/products',
            username:username,
            currentPage:page,
            hasNextPage:ITEMS_PER_PAGE*page<totalProducts,
            hasPrevPage:page>1,
            nextPage:page+1,
            previousPage:page-1,
            lastPage:Math.ceil(totalProducts/ITEMS_PER_PAGE)
        });
    })
    .catch(err=>{
        console.log(err);
    });
    
};

exports.getIndex=(req,res,next)=>{
    const page = +req.query.page || 1;
    let username;
    if(req.session.isLoggedIn){
        username=req.user.name
    }else{
        username='GUEST'
    }
    db();
    let totalProducts;
    Product.query()
    .then(products=>{
        totalProducts = products.length;
    })

    Product.query()
    .offset((page-1)*ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .then(products=>{
        return res.render('shop/index',{
            prods:products,
            pageTitle:'Home',
            path:'/',
            username:username,
            currentPage:page,
            hasNextPage:ITEMS_PER_PAGE*page<totalProducts,
            hasPrevPage:page>1,
            nextPage:page+1,
            previousPage:page-1,
            lastPage:Math.ceil(totalProducts/ITEMS_PER_PAGE)
        });
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getCart=async (req,res,next)=>{
    let products;
    let totalPrice;
    let username;
    if(req.session.isLoggedIn){
        username=req.user.name
    }else{
        username='GUEST'
    }
    try{
        const cartItem = await req.cart.$relatedQuery('cartItems');
        products =await Promise.all(cartItem.map(async item=>{
            item.product = await item.$relatedQuery('product')
            return item
        }));
        totalPrice=(await Cart.query().findById(req.cart.id)).totalPrice;

        res.render('shop/cart',{
                    pageTitle:'Your Cart',
                    path:'/cart',
                    products:products,
                    totalPrice:totalPrice,
                    username:username
                });
    }catch(err){
        console.log(err);
    }

    // req.user
    // .populate('cart.items.productId')
    // // .execPopulate()
    // .then(user=>{
    //     const products=user.cart.items;
    //     let totalPrice=0;
    //     products.map(item=>{
    //         totalPrice += Number(item.productId.price)*item.quantity
    //     })
    //     res.render('shop/cart',{
    //         pageTitle:'Your Cart',
    //         path:'/cart',
    //         products:products,
    //         totalPrice:totalPrice
    //     });
    // })
};

exports.postdeleteCartItem=async (req,res,next)=>{
    const prodId=req.body.prodId;
    try{
        const cartItem = await CartItem.query().findOne({
            cartId:req.cart.id,
            productId:prodId
        })
        await Cart.query().patchAndFetchById(req.cart.id,{
            totalPrice : req.cart.totalPrice - cartItem.quantity * (await Product.query().findById(prodId)).price
        })

        await CartItem.query().deleteById(cartItem.id);
        req.cart=await req.user.$relatedQuery('cart')
        res.redirect('/cart');
    }catch(err){
        console.log(err);
    }
}

exports.postCart=async (req,res,next)=>{
    db();
    const prodId=req.params.productId;
    console.log(req.user);
    const cart = await req.user.$relatedQuery('cart')
    try{
        let cartItem = await CartItem.query().findOne({
            cartId:cart.id,
            productId:prodId
        })
        await Cart.query().patchAndFetchById(req.cart.id,{
            totalPrice: cart.totalPrice + (await Product.query().findById(prodId)).price
        })
        if(cartItem){
            await cartItem.$query().patchAndFetch({
                quantity:cartItem.quantity+1
            })
        }else{
            await CartItem.query().insert({
                cartId:cart.id,
                productId:prodId,
                quantity:1
            })
        }
        req.cart = await req.user.$relatedQuery('cart')
        res.redirect('/cart')
    }catch(err){
        console.log(err);
    }
}

exports.getCheckout=async(req,res,next)=>{
    let products;
    let totalPrice;
    let username;
    if(req.session.isLoggedIn){
        username=req.user.name
    }else{
        username='GUEST'
    }
    try{
        const cartItem = await req.cart.$relatedQuery('cartItems');
        products =await Promise.all(cartItem.map(async item=>{
            item.product = await item.$relatedQuery('product')
            return item
        }));
        totalPrice=(await Cart.query().findById(req.cart.id)).totalPrice;
        res.render('shop/checkout',{
            products:products,    
            path:'/checkout',
            pageTitle:'Checkout',
            username:username,
            totalPrice:totalPrice
        });
    }catch(err){
        console.log(err);
    }
    
};


exports.getProduct=(req,res,next)=>{
    let username;
    if(req.session.isLoggedIn){
        username=req.user.name
    }else{
        username='GUEST'
    }
    db();
    const prodId=req.params.productId;
    Product.query().findById(prodId)
    .then(product=>{
        res.render('shop/product-detail',{
            product:product,    
            path:'/products',
            pageTitle:'Product Detail',
            username:username
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getOrder=async(req,res,next)=>{
    let username;
    if(req.session.isLoggedIn){
        username=req.user.name
    }else{
        username='GUEST'
    }
    try{
        const order= await req.user.$relatedQuery('orders');
        const orderItems = []
        await Promise.all(order.map(async item=>{
            const products=[]
            const temp = await item.$relatedQuery('orderItems')
            await Promise.all(temp.map(async i=>{
                i.product = await i.$relatedQuery('product')
                products.push(i)
            }));
            const order=
                {
                    info:{
                        orderId:item.id,
                        totalPrice:item.totalPrice
                    },
                    products:products
                }
            
            orderItems.push(order);
        }));
        res.render('shop/orders',{
            pageTitle:'Orders',
            path:"/orders",
            orders:orderItems,
            username:username
        })
    }catch(err){
        console.log(err);
    }
}

exports.postOrder =async (req,res,next)=>{
    try{
        const cart = await req.user.$relatedQuery('cart');
        const cartItem = await cart.$relatedQuery('cartItems')
        const temp=await req.user.$relatedQuery('orders').insert({
            totalPrice:cart.totalPrice,
        })
        
        await Promise.all(cartItem.map(async item=>{
            await temp.$relatedQuery('orderItems').insert({
                quantity:item.quantity,
                productId:item.productId
            })
        }))

        await cart.$relatedQuery('cartItems').delete();
        await req.user.$relatedQuery('cart').patch({
            totalPrice:0
        })

        res.redirect('/orders')
    }catch(err){
        console.log(err);
    }
}

exports.getInvoice =async (req,res,next) =>{
    const orderId = req.params.orderId;
    let totalPrice;
    Order.query().findById(orderId)
    .then(order=>{
        if(!order){
            return next(new Error('No order found'));
        }
        if(order.userId!==req.user.id){
            return next(new Error('Unauthorized'));
        }
        totalPrice=order.totalPrice;
    })
    .catch(err=>{
        next(err);
    })
    const orderItems = await OrderItem.query().where({
        orderId:orderId
    });
    const invoiceName = 'invoice-'+orderId + '-' + req.user.id + '.pdf';
    const invoicePath = path.join('data','invoices',invoiceName);

    const pdfDoc = new PDFDocument();
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    pdfDoc.fontSize(26).text('Invoice',{
        underline:true
    });
    pdfDoc.text('-----------------------');
    await Promise.all(orderItems.map(async order=>{
        const product = await Product.query().findById(order.productId);
        pdfDoc.fontSize(18).text(`Product Id : ${order.productId}`)
        pdfDoc.text(`     `);
        pdfDoc.fontSize(14).text(`${product.title}        Rs ${product.price}   x   ${order.quantity}`);
        pdfDoc.text(`                             Total Price : ${order.quantity * product.price}`);
        pdfDoc.text('-------------------------------------------------------------')
    }))
    pdfDoc.text(`         `);
    pdfDoc.fontSize(22).text(`                     Total Price : ${totalPrice}`);
    pdfDoc.end();
    // fs.readFile(invoicePath,(err,data)=>{
    //     if(err){
    //         return next(err);
    //     }
    //     res.setHeader('Content-Type','application/pdf');
    //     res.setHeader('Content-Disposition','inline; filename="'+invoiceName + '"');
    //     res.send(data);
    // })
    // const file = fs.createReadStream(invoicePath);
    // res.setHeader('Content-Type','application/pdf');
    // res.setHeader('Content-Disposition',
    //             'inline; filename="'+invoiceName + '"');
    // file.pipe(res);
}

exports.getCheckoutSuccess=(req,res,next) =>{
    res.redirect('/orders');
}

exports.getCheckoutCancel = (req,res,next) =>{
    let username;
    if(req.session.isLoggedIn){
        username=req.user.name
    }else{
        username='GUEST'
    }
    res.render('/shop/checkoutCancel',{
        pageTitle:'Checkout',
        path:"/checkoutCancel",
        orders:orderItems,
        username:username
    })
}