const Product=require('../models/product');

exports.getProducts=(req,res,next)=>{
    Product.findAll()
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
    Product.findAll()
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
    .then(cart=>{
        return cart.getProducts()
        .then(products=>{
            res.render('shop/cart',{
                pageTitle:'Your Cart',
                path:'/cart',
                products:products,
                totalPrice:cart.totalPrice
            });
        })
        .catch(err=>{
            console.log(err);
        });
    }).catch(err=>{
        console.log(err);
    })
};

exports.postdeleteCartItem=(req,res,next)=>{
    const prodId=req.body.prodId;
    let fetchedCart;
    req.user
    .getCart()
    .then(cart=>{
        fetchedCart=cart;
        return cart.getProducts({where : {id:prodId}});
    })
    .then(products=>{
        const product=products[0];
        // console.log(product.cartItem.quantity);
        fetchedCart.totalPrice = fetchedCart.totalPrice - product.dataValues.price*product.cartItem.quantity;
        fetchedCart.save();
        return product.cartItem.destroy();
    })
    .then(result=>{
        res.redirect('/cart');
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postCart=(req,res,next)=>{
    const prodId=req.params.productId;
    let fetchedCart;
    let newProductQty=1;
    let totalPrice;
    req.user.
    getCart()
    .then(cart=>{
        fetchedCart=cart;
        totalPrice=cart.dataValues.totalPrice;
        return cart.getProducts({where : { id : prodId}});
    })
    .then(products=>{
        let product;
        if(products.length > 0){
            product=products[0];
        }
        if(product){
            const oldQuantity=product.cartItem.quantity;
            newProductQty=oldQuantity+1;
            return product;
        }
        return Product.findByPk(prodId);
    })
    .then(product=>{
        totalPrice=totalPrice + +product.dataValues.price;
        fetchedCart.totalPrice=totalPrice;
        fetchedCart.save();
        return product;
    })
    .then(product=>{
        return fetchedCart.addProduct(product,{
            through : { quantity : newProductQty}
        })
    })
    .then((r)=>{
        console.log(r);
        res.redirect('/cart');
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
    Product.findByPk(prodId)
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
    req.user.getOrders({include : ['products']})
    .then(orders=>{
        console.log(orders[0]);
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
    let fetchedCart;
    req.user
    .getCart()
    .then(cart=>{
        fetchedCart=cart;
        return cart.getProducts();
    })
    .then(products=>{
        return req.user.
        createOrder({
            price:fetchedCart.totalPrice
        })
        .then(order=>{
            return order.addProducts(products.map(product=>{
                product.orderItem = {quantity : product.cartItem.quantity};
                return product;
            }));
        })
        .catch(err=>console.log(err));
    })
    .then(result=>{
        fetchedCart.totalPrice=0;
        fetchedCart.save();
        return fetchedCart.setProducts(null);
    })
    .then(result=>{
        res.redirect('orders');
    })
    .catch(err=>{
        console.log(err);
    })
}