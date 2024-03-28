const mysql=require('mysql2');
const dotenv=require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'nodejs',
    password:process.env.DATABASE_KEY
});

module.exports=pool.promise();