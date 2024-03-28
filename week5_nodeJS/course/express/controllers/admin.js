const Product=require('../models/product');

exports.getAddProduct = (req,res,next)=>{
    // console.log('In the middleware!');
    // res.sendFile(path.join(rootPath,'views','add-product.html'));
    res.render('admin/edit-product',{
        pageTitle:"Add Product",
        path:'/admin/add-product',
        editing:false
    });
};

exports.postAddProduct=(req,res,next)=>{
    // console.log(req.body);
    // products.push({title:req.body.title,price:req.body.price});
    const product=new Product(
        null,
        req.body.title,
        req.body.imgUrl,
        req.body.desc,
        req.body.price
        );
    product.save();
    res.redirect('/');
};

exports.getEditProduct=(req,res,next)=>{
    const editMode=req.query.edit;
    if(!editMode){
        return res.redirect('/');
    }
    const prodId=req.params.productId;
    Product.findById(prodId,(product)=>{
        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product',{
            pageTitle:'Edit Product',
            path:'/admin/edit-product',
            editing:editMode,
            product:product
        });
    });
}

exports.postEditProduct=(req,res,next)=>{
    const prodId=req.body.prodId;
    const updatedProduct=new Product(
        prodId,
        req.body.title,
        req.body.imgUrl,
        req.body.desc,
        req.body.price
    );
    updatedProduct.save()
    res.redirect('/admin/products');
}

exports.getProducts=(req,res,next)=>{
    Product.fetchAll((products)=>{
        res.render('admin/products',{
            prods:products,
            pageTitle:'Admin Products',
            path:'/admin/products'
        })
    })
}

exports.deleteProduct=(req,res,next)=>{
    const prodId=req.body.prodId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
}