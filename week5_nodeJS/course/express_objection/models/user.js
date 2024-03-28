const {Model}=require('objection');

class User extends Model{
    static get tableName(){
        return 'users';
    }

    static get relationMappings(){
        const Cart = require('../models/cart');
        const Order = require('../models/order');
        const Product = require('./product');
        return {
            cart:{
                relation:Model.HasOneRelation,
                modelClass:Cart,
                join:{
                    from:'users.id',
                    to:'carts.userId'
                }
            },
            orders:{
                relation:Model.HasManyRelation,
                modelClass:Order,
                join:{
                    from:'users.id',
                    to:'orders.userId'
                }
            },
            products:{
                relation:Model.HasManyRelation,
                model:Product,
                join:{
                    from:'users.id',
                    to:'products.userId'
                }
            }
        }
    }
}

module.exports=User;