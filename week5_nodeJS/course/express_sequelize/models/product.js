const {Sequelize, DataTypes}=require('sequelize');
const sequelize=require('../util/database');

const Product = sequelize.define('product',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imgUrl:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    createdAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    },
    updatedAt:{
        type:DataTypes.DATE,
        defaultValue:DataTypes.NOW
    }
});

module.exports=Product;