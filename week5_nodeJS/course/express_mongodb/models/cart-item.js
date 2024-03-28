const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../util/database');

const cartItem = sequelize.define('cartItem',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,
        autoIncrement:true
    },
    quantity:{
        type:DataTypes.INTEGER
    }
});

module.exports = cartItem;