const {Model} = require('objection');

class Product extends Model{
    static get tableName(){
        return 'products';
    }

    $beforeInsert(){
        this.createdAt = new Date();
    }

    $beforeUpdate(){
        this.updatedAt = new Date();
    }

    static get titleColumn(){
        return 'title';
    }

    static get jsonSchema(){
        return {
            type:'object',
            required:['title','imgUrl','price','description'],
            properties:{
                id:{type:'integer'}
            }
        }
    }

    static get relationMappings(){
        const Cart = require('../models/cart');
        const CartItem = require('../models/cartItem');
        const orderItem = require('./orderItem');
        const User = require('./user');
        return {
            carts:{
                relation:Model.ManyToManyRelation,
                modelClass:Cart,
                join:{
                    from:'products.id',
                    through:{
                        from:'cart_items.productId',
                        to:'cart_items.cartId'
                    },
                    to:'carts.id'
                }
            },
            cartItems:{
                relation:Model.HasManyRelation,
                modelClass:CartItem,
                join:{
                    from:'products.id',
                    to:'cart_items.productId'
                }
            },
            orderItems:{
                relation:Model.HasManyRelation,
                modelClass:orderItem,
                join:{
                    from:'products.id',
                    to:'order_items.productId'
                }
            },
            user:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    from:'products.userId',
                    to:'users.id'
                }
            }
        }
    }
}

module.exports=Product;