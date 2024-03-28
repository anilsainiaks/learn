const {Model} = require('objection');

class Order extends Model{
    static get tableName(){
        return 'orders';
    }

    static get relationMappings(){
        const Product = require('./product');
        const User = require('./user');
        const OrderItem = require('./orderItem');
        return{
            products:{
                relation:Model.ManyToManyRelation,
                modelClass:Product,
                join:{
                    from:'orders.id',
                    through:{
                        from:'order_items.orderId',
                        to:'order_items.productId'
                    },
                    to:'products.id'
                }
            },
            user:{
                relation:Model.BelongsToOneRelation,
                modelClass:User,
                join:{
                    from:'orders.userId',
                    to:'users.id'
                }
            },
            orderItems:{
                relation:Model.HasManyRelation,
                modelClass:OrderItem,
                join:{
                    from:'orders.id',
                    to:'order_items.orderId'
                }
            }
        }
    }
}

module.exports=Order;