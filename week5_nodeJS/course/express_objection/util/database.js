const {Model} =require('objection');
const knex =require('knex');
const knexfile = require('./knexfile');

function db(){
    const t = knex(knexfile.development);
    Model.knex(t);
}

module.exports=db;