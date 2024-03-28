const Product=require('../models/product');
const Cart=require('../models/cart');

exports.getProducts=(req,res,next)=>{
    // console.log(products);
    // res.sendFile(path.join(rootDir,'views','shop.html'));
    const products=Product.fetchAll((products)=>{
        res.render('shop/product-list',{
            prods:products,
            pageTitle:'All Products',
            path:'/products',
        });
    });
};

exports.getIndex=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('shop/index',{
            prods:products,
            pageTitle:'Shop',
            path:'/',
        });
    })
}

exports.getCart=(req,res,next)=>{
    Cart.getCart(cart=>{
        Product.fetchAll(products=>{
            const cartProducts=[]
            products.map(p=>{
                const cartProductData=cart.products.find(prod=>prod.id===p.id);
                if(cart.products.find(prod=>prod.id===p.id)){
                    cartProducts.push({productData:p,qty:cartProductData.qty});
                }
            });
            res.render('shop/cart',{
                pageTitle:'Your Cart',
                path:'/cart',
                products:cartProducts,
                totalPrice:cart.totalPrice
            });
        });
    });
    
};

exports.postdeleteCartItem=(req,res,next)=>{
    const prodId=req.body.prodId;
    Product.findById(prodId,product=>{
        Cart.deleteProduct(prodId,product.price)
        res.redirect('/cart');
    })
}

exports.postCart=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.findById(prodId,product=>{
        Cart.addProduct(prodId,product.price);
    })
    res.redirect('/cart');
}

exports.getCheckout=(req,res,next)=>{
    res.render('shop/checkout',{
        'path':'/checkout',
        pageTitle:'Checkout'
    });
};

exports.getOrders=(req,res,next)=>{
    res.render('shop/orders',{
        path:'/orders',
        pageTitle:'Orders'
    })
}

exports.getProduct=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.findById(prodId,product=>{
        res.render('shop/product-detail',{
            product:product,
            path:'/products',
            pageTitle:'Product Detail'
        })
    });
}