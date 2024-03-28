const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');
const {ObjectId} = require('mongodb');
class Product {
    constructor(title,imgUrl,price,description,id,userId){
        this.title=title,
        this.imgUrl=imgUrl,
        this.price=price,
        this.description=description
        this._id= new ObjectId(id),
        this.userId=userId
    }

    save(){
        const db=getDb();
        let dbOp;
        if(this._id){
            dbOp = db.collection('products').updateOne({
                _id: this._id
            },{$set:this}) ;
        }
        return db.collection('products')
        .insertOne(this)
        .then()
        .catch(err=>{
            console.log(err);
        })
    }

    static fetchAll(){
        const db=getDb();
        return db.collection('products')
        .find()
        .toArray()
        .then(products=>{
            return products;
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static findById(id){
        const db=getDb();
        return db.collection('products')
        .find({_id:new mongodb.ObjectId(id)})
        .next()
        .then(product=>{
            return product;
        })
        .catch(err=>{
            console.log(err);
        })
    }

    static deleteById(id){
        const db=getDb();
        return db.collection('products')
        .deleteOne({_id:new mongodb.ObjectId(id)})
        .then(result=>{
            console.log('Deleted');
        })
        .catch(err=>{
            console.log(err);
        })
    }
}


module.exports=Product;