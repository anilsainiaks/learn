const {Model}=require('objection');

class CartItem extends Model{
    static get tableName(){
        return 'cart_items';
    }

    static get relationMappings(){
        const Cart=require('../models/cart');
        const Product=require('../models/product');
        return {
            cart:{
                relation:Model.BelongsToOneRelation,
                modelClass:Cart,
                join:{
                    from:'cart_items.cartId',
                    to:'carts.id'
                }
            },
            product:{
                relation:Model.BelongsToOneRelation,
                modelClass:Product,
                join:{
                    from:'cart_items.productId',
                    to:'products.id'
                }
            }
        }
    }


}

module.exports=CartItem;