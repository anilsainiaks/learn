const path=require('path');
const fs=require('fs');
const rootPath=require('../util/path');

const p=path.join(rootPath,'data','cart.json');


module.exports=class Cart{
    static addProduct(id, productPrice){
        fs.readFile(p,(err,data)=>{
            let cart;
            if(err || data.length===0){
                cart={products:[],totalPrice:0};
            }else{
                cart=JSON.parse(data);
            }

            const existingProductIndex=cart.products.findIndex(prod=>prod.id===id);
            if(existingProductIndex!==-1){
                cart.products[existingProductIndex].qty+=1;
            }else{
                let updatedProduct={id:id,qty:1}
                cart.products=[...cart.products,updatedProduct];
            }
            cart.totalPrice= cart.totalPrice + +productPrice;
            fs.writeFile(p,JSON.stringify(cart),err=>{
                console.log(err);
            })
        });
    }

    static getCart(cb){
        fs.readFile(p,(err,data)=>{
            if(err || data.length===0){
                cb(null);
            }else{
                cb(JSON.parse(data));
            }
        })
    }

    static deleteProduct(id,productPrice){
        fs.readFile(p,(err,data)=>{
            if(err || data.length===0){
                return;
            }else{
                const updatedCart={...JSON.parse(data)};
                const product=updatedCart.products.find(p=>p.id===id);
                if(!product){
                    return;
                }
                const productQty=product.qty;
                updatedCart.products=updatedCart.products.filter(p=>p.id!==id);
                updatedCart.totalPrice=updatedCart.totalPrice - productPrice*productQty;

                fs.writeFile(p,JSON.stringify(updatedCart),err=>{
                    console.log(err);
                })
            }
        })
    }
}