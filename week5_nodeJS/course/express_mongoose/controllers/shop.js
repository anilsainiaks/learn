const Product=require('../models/product');
const Order = require('../models/orders');

exports.getProducts=(req,res,next)=>{
    console.log(Product.find());
    Product.find()
    .then(result=>{
        res.render('shop/product-list',{
            prods:result,
            pageTitle:'All Products',
            path:'/products',
        });
    })
    .catch(err=>{
        console.log(err);
    });
    
};

exports.getIndex=(req,res,next)=>{
    Product.find()
    .then(result=>{
        res.render('shop/index',{
            prods:result,
            pageTitle:'Home',
            path:'/',
        });
    })
    .catch(err=>{
        console.log(err);
    });
}

exports.getCart=(req,res,next)=>{
    req.user
    .populate('cart.items.productId')
    // .execPopulate()
    .then(user=>{
        const products=user.cart.items;
        let totalPrice=0;
        products.map(item=>{
            totalPrice += Number(item.productId.price)*item.quantity
        })
        res.render('shop/cart',{
            pageTitle:'Your Cart',
            path:'/cart',
            products:products,
            totalPrice:totalPrice
        });
    })
};

exports.postdeleteCartItem=(req,res,next)=>{
    const prodId=req.body.prodId;
    req.user
    .deleteItemFromCart(prodId)
    .then(result=>{
        res.redirect('/cart');
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postCart=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.findById(prodId)
    .then(product=>{
        return req.user.addToCart(product);
    })
    .then(result=>{
        res.redirect('/cart')
    })
    .catch(err=>{
        console.log(err);
    })
}

// exports.getCheckout=(req,res,next)=>{
//     res.render('shop/checkout',{
//         'path':'/checkout',
//         pageTitle:'Checkout'
//     });
// };


exports.getProduct=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.findById(prodId)
    .then(product=>{
        res.render('shop/product-detail',{
            product:product,
            path:'/products',
            pageTitle:'Product Detail'
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getOrder=(req,res,next)=>{
    Order.find({'user.userId':req.user._id})
    .then(orders=>{
        console.log(orders[0].products);
        res.render('shop/orders',{
            pageTitle:'Orders',
            path:"/orders",
            orders:orders
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postOrder = (req,res,next)=>{
    let totalPrice=0;
    req.user
    .populate('cart.items.productId')
    .then(user=>{
        const products = user.cart.items.map(i=>{
            totalPrice+= Number(i.productId.price)*i.quantity
            return {quantity:i.quantity, product:{...i.productId._doc}}
        })
        const order = new Order({
            user:{
                name:req.user.name,
                userId:req.user
            },
            products:products,
            totalPrice:totalPrice
        })
        order.save()
    })
    .then(()=>{
        return req.user.clearCart();
    })
    .then(result=>{
        res.redirect('/orders');
    })
    .catch(err=>{
        console.log(err);
    })
}