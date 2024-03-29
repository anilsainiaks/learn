const fs=require('fs');
const path=require('path');
const rootPath=require('../util/path');
const { json } = require('body-parser');
const Cart=require('./cart');

const p=path.join(rootPath,'data','products.json');
const getProductsFromFile=(cb)=>{
        fs.readFile(p,(err,data)=>{
            if(data.length===0 || err){
                cb([]);
            }else{
                cb(JSON.parse(data));
            }
        });
}

module.exports=class Product{
    constructor(id,title,imgUrl,description,price){
        this.id=id;
        this.title=title;
        this.imgUrl=imgUrl;
        this.description=description;
        this.price=price;
    }

    save(){
        getProductsFromFile(products=>{
            if(this.id){
                const existingProductIndex=products.findIndex(p=>p.id===this.id);
                const updatedProducts=[...products];
                updatedProducts[existingProductIndex]=this;
                fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                    console.log(err);
                });
            }else{
                this.id= Math.random().toString();
                products.push(this);
                fs.writeFile(p,JSON.stringify(products),(err)=>{
                    console.log(err);
                });
            }
            
        })
    }

    static deleteById(id){
        getProductsFromFile(products=>{
            const product=products.find(p=>p.id===id);
            const updatedProducts=products.filter(p=>p.id!==id);
            fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                if(!err){
                    Cart.deleteProduct(id,product.price);
                }
            });
        });
    }

    static fetchAll(cb){
        getProductsFromFile(cb);
    }

    static findById(id,cb){
        getProductsFromFile(products=>{
            const product=products.find(p=>p.id===id);
            cb(product);
        })
    }
}