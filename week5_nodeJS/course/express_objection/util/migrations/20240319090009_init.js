/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .createTable('users',table=>{
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('resetToken');
    table.string('resetTokenExpiration');
    table.timestamps(true,true);
  })
  .createTable('products',table=>{
    table.increments();
    table.string('title').notNullable();
    table.string('imgUrl').notNullable();
    table.integer('price').notNullable();
    table.string('description').notNullable();
    table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE');
    table.timestamps(true,true);
  })
  .createTable('carts',table=>{
    table.increments();
    table.integer('totalPrice').defaultTo(0);
    table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE')
    table.timestamps(true,true);
  })
  .createTable('orders',table=>{
    table.increments();
    table.integer('totalPrice').defaultTo(0);
    table.integer('userId').unsigned().references('id').inTable('users').onDelete('CASCADE')
    table.timestamps(true,true);
  })
  .createTable('cart_items',table=>{
    table.increments();
    table.integer('quantity').notNullable();
    table.integer('cartId').unsigned().references('id').inTable('carts').onDelete('CASCADE');
    table.integer('productId').unsigned().references('id').inTable('products').onDelete('CASCADE');
    table.timestamps(true,true)
  })
  .createTable('order_items',table=>{
    table.increments();
    table.integer('quantity').notNullable();
    table.integer('orderId').unsigned().references('id').inTable('orders').onDelete('CASCADE');
    table.integer('productId').unsigned().references('id').inTable('products').onDelete('CASCADE');
    table.timestamps(true,true)
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('cartItems')
    .dropTableIfExists('orderItems')
    .dropTableIfExists('orders')
    .dropTableIfExists('carts')
    .dropTableIfExists('products')
    .dropTableIfExists('users')
};
