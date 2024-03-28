const Product=require('../models/product');

exports.getProducts=(req,res,next)=>{
    Product.fetchAll()
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
    Product.fetchAll()
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
    req.user.getCart()
    .then(products=>{
        // console.log(products)
        res.render('shop/cart',{
            pageTitle:'Your Cart',
            path:'/cart',
            products:products.products,
            totalPrice:products.totalPrice
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

exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{
        'path':'/checkout',
        pageTitle:'Checkout'
    });
};


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
    req.user.getOrders()
    .then(orders=>{
        console.log(orders[0].items);
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
    req.user
    .addOrder()
    .then(result=>{
        res.redirect('/orders');
    })
    .catch(err=>{
        console.log(err);
    })
}