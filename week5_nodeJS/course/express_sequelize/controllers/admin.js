const Product=require('../models/product');

exports.getAddProduct = (req,res,next)=>{
    const isLoggedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    res.render('admin/edit-product',{
        pageTitle:"Add Product",
        path:'/admin/add-product',
        editing:false,
        isAuthenticated:isLoggedIn
    });
};


exports.postAddProduct=(req,res,next)=>{
    const title=req.body.title;
    const imgUrl=req.body.imgUrl;
    const price=req.body.price;
    const description=req.body.description
    req.user.createProduct({
        title:title,
        imgUrl:imgUrl,
        price:price,
        description:description,
        userId:req.user.id
    })
    .then(result=>{
        res.redirect('/admin/products')
    })
    .catch(err=>console.log(err));
};

exports.getEditProduct=(req,res,next)=>{
    const isLoggedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    const editMode=req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId=req.params.productId;
    Product.findByPk(prodId)
    .then(product=>{
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
            pageTitle:'Edit Product',
            path:'/admin/edit-product',
            editing:editMode,
            product:product,
            isAuthenticated:isLoggedIn
        });
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postEditProduct=(req,res,next)=>{
    const prodId=req.body.prodId;
    const title=req.body.title;
    const imgUrl=req.body.imgUrl;
    const price=req.body.price;
    const description=req.body.description
    Product.findByPk(prodId)
    .then(result=>{
        result.title=title;
        result.imgUrl=imgUrl;
        result.price=price;
        result.description=description;
        result.save();
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getProducts=(req,res,next)=>{
    const isLoggedIn = req.get('Cookie').split(';')[2].trim().split('=')[1];
    Product.findAll()
    .then(products=>{
        res.render('admin/products',{
            prods:products,
            pageTitle:'Admin Products',
            path:'/admin/products',
            isAuthenticated:isLoggedIn
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.deleteProduct=(req,res,next)=>{
    const prodId=req.body.prodId;
    Product.findByPk(prodId)
    .then(product=>{
        product.destroy();
        res.redirect('/admin/products')
    })
    .catch(err=>{
        console.log(err);
    });
}