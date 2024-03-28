const {Sequelize}=require('sequelize');
const dotenv=require('dotenv');

dotenv.config();

const sequelize = new Sequelize('nodejs','root',process.env.DATABASE_KEY,{
    dialect:'mysql',
    host:'localhost'
});

module.exports=sequelize;