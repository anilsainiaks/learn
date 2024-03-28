const {Model} = require('objection');

class OrderItem extends Model{
    static get tableName(){
        return 'order_items';
    }

    static get relationMappings(){
        const Order = require('./order');
        const Product = require('./product');
        return {
            product : {
                relation:Model.BelongsToOneRelation,
                modelClass:Product,
                join:{
                    from:'order_items.productId',
                    to:'products.id'
                }
            },
            order:{
                relation:Model.BelongsToOneRelation,
                modelClass:Order,
                join:{
                    from:'order_items.orderId',
                    to:'orders.id'
                }
            }
        }
    }
}

module.exports=OrderItem;