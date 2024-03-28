const {Model}=require('objection');

class Cart extends Model{
    static get tableName(){
        return 'carts';
    }

    static get relationMappings(){
        const User=require('../models/user');
        const Product=require('../models/product');
        const CartItem = require('../models/cartItem');
        return {
            user:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    from:'carts.userId',
                    to:'users.id'
                }
            },
            products:{
                relation:Model.ManyToManyRelation,
                modelClass:Product,
                join:{
                    from:'carts.id',
                    through:{
                        from:'cart_items.cartId',
                        to:'cart_items.productId'
                    },
                    to:'products.id'
                }
            },
            cartItems:{
                relation:Model.HasManyRelation,
                modelClass:CartItem,
                join:{
                    from:'carts.id',
                    to:'cart_items.cartId'
                }
            }
        }
    }


}

module.exports=Cart;