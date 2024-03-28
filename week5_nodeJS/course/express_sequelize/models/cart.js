const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../util/database');

const Cart = sequelize.define('cart',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    totalPrice:{
        type:DataTypes.DOUBLE,
        allowNull:false,
        defaultValue:0
    }
});

module.exports = Cart;