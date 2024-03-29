const Product=require('../models/product');
const {ObjectId} = require('mongodb');

exports.getAddProduct = (req,res,next)=>{
    res.render('admin/edit-product',{
        pageTitle:"Add Product",
        path:'/admin/add-product',
        editing:false
    });
};


exports.postAddProduct=(req,res,next)=>{
    const title=req.body.title;
    const imgUrl=req.body.imgUrl;
    const price=req.body.price;
    const description=req.body.description
    const product = new Product(title,imgUrl,price,description,null,req.user._id);
    product.save().then(result=>{
        console.log('Created Product');
        res.redirect('/admin/products');
    }).catch(err=>{
        console.log(err);
    })
};

exports.getEditProduct=(req,res,next)=>{
    const editMode=req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId=req.params.productId;
    Product.fetchAll(prodId)
    .then(product=>{
        if(!product){
            return res.redirect('/');
        }
        console.log(product);
        res.render('admin/edit-product',{
            pageTitle:'Edit Product',
            path:'/admin/edit-product',
            editing:editMode,
            product:product[0]
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
    const product = new Product(
        title,
        imgUrl,
        price,
        description,
        prodId
    );
    product.save()
    .then(result=>{
        console.log('UPDATED PRODUCT');
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getProducts=(req,res,next)=>{
    Product.fetchAll()
    .then(products=>{
        res.render('admin/products',{
            prods:products,
            pageTitle:'Admin Products',
            path:'/admin/products'
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.deleteProduct=(req,res,next)=>{
    const prodId=req.body.prodId;
    Product.deleteById(prodId)
    .then(product=>{
        res.redirect('/admin/products')
    })
    .catch(err=>{
        console.log(err);
    });
}