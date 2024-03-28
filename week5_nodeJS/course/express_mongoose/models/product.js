const mongoose = require('mongoose');

const productSchema =new mongoose.Schema(
    {
        title : {
            type : String,
            required : true 
        },
        imgUrl :{
            type:String,
            required:true
        },
        price : {
            type:String,
            required:true
        },
        description : {
            type:String,
            required:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        }
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model('Product',productSchema);