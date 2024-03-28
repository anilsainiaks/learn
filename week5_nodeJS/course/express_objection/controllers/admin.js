const { validationResult } = require('express-validator');
const Product = require('../models/product');
const db=require('../util/database');
const fileHelper = require('../util/file');
const { file } = require('pdfkit');
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
    .where('userId',req.user.id)
    .offset((page-1)*ITEMS_PER_PAGE)
    .limit(ITEMS_PER_PAGE)
    .then(products=>{
        res.render('admin/products',{
            prods:products,
            pageTitle:'Admin Products',
            path:'/admin/products',
            username:username,
            currentPage:page,
            hasNextPage:ITEMS_PER_PAGE*page<totalProducts,
            hasPrevPage:page>1,
            nextPage:page+1,
            previousPage:page-1,
            lastPage:Math.ceil(totalProducts/ITEMS_PER_PAGE)
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getAddProduct = (req,res,next)=>{
    let username;
    if(req.session.isLoggedIn){
        username=req.user.name
    }else{
        username='GUEST'
    }
    if(!req.session.isLoggedIn){
        return res.redirect('/login');
    }
    res.render('admin/edit-product',{
        pageTitle:"Add Product",
        path:'/admin/add-product',
        editing:false,
        username:username,
        errorMessage:null,
        oldInput:{title:'',price:'',imgUrl:'',description:''}
    });
};


exports.postAddProduct=(req,res,next)=>{
    db();
    const title=req.body.title;
    const image=req.file;
    const price=req.body.price;
    const description=req.body.description
    const errors = validationResult(req);
    const imgUrl = image.path;
    if(req.session.isLoggedIn){
        username=req.user.name
    }else{
        username='GUEST'
    }
    if(!imgUrl){
        return res.status(422).render('admin/edit-product',{
            pageTitle:"Add Product",
            path:'/admin/add-product',
            editing:false,
            username:username,
            errorMessage:'Attached file is not an Image',
            oldInput:{title:title,price:price,imgUrl:imgUrl,description:description}
        })
    }
    if(!errors.isEmpty()){
        return res.status(422).render('admin/edit-product',{
            pageTitle:"Add Product",
            path:'/admin/add-product',
            editing:false,
            username:username,
            errorMessage:errors.array()[0].msg,
            oldInput:{title:title,price:price,imgUrl:imgUrl,description:description}
        });
    }
    Product.query()
    .insert({
        title:title,
        imgUrl:imgUrl,
        price:price,
        description:description,
        userId:req.user.id
    })
    .then(result=>{
        console.log('Created Product');
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    })
};

exports.getEditProduct=(req,res,next)=>{
    let username;
    if(req.session.isLoggedIn){
        username=req.user.name
    }else{
        username='GUEST'
    }
    db();
    const editMode=req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId=req.params.productId;
    Product.query().findById(prodId)
    .then(product=>{
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
            pageTitle:'Edit Product',
            path:'/admin/edit-product',
            editing:editMode,
            product:product,
            username:username,
            errorMessage:null
        });
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postEditProduct=(req,res,next)=>{
    db();
    let username;
    if(req.session.isLoggedIn){
        username=req.user.name
    }else{
        username='GUEST'
    }
    const prodId=req.body.prodId;
    const title=req.body.title;
    const image=req.file;
    const price=req.body.price;
    const description=req.body.description
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render('admin/edit-product',{
            pageTitle:'Edit Product',
            path:'/admin/edit-product',
            editing:true,
            username:username,
            errorMessage:errors.array()[0].msg,
            product:{
                title:title,
                price:price,
                description:description,
                id:prodId
            }
        });
    }
    const updateData = {
        title:title,
        price:price,
        description:description
    }
    if(image){
        const imgUrl = image.path;
        Product.query().findById(prodId)
        .then(product=>{
            fileHelper.deleteFile(product.imgUrl);
        })
        .catch(err=>{
            console.log(err);
        })
        updateData.imgUrl=imgUrl;
    }
    Product.query()
    .findById(prodId)
    .where('userId',req.user.id)
    .patch(updateData)
    .then(result=>{
        console.log('UPDATED PRODUCT');
        res.redirect('/admin/products');
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.deleteProduct=(req,res,next)=>{
    const prodId=req.params.productId;
    Product.query()
    .findById(prodId)
    .where('userId',req.user.id)
    .then(product=>{
        fileHelper.deleteFile(product.imgUrl);
        return Product.query().deleteById(product.id);
    })
    .then(()=>{
        res.status(200).json({message:'Success'});
    })
    .catch(err=>{
        res.status(500).json({message:'Failure'});
    });
}