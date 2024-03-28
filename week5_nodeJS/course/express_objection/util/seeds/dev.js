/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex.raw('TRUNCATE TABLE users');
  await knex.raw('TRUNCATE TABLE products');
  await knex.raw('TRUNCATE TABLE carts');
  await knex.raw('TRUNCATE TABLE orders');
  await knex.raw('TRUNCATE TABLE cart_items');
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');

  // Deletes ALL existing entries
  await knex('products').insert([
    {
      id:1,
      title:'Spiderman',
      imgUrl:"https://www.crossword.in/cdn/shop/files/51r3a9y6weL.jpg?v=1683526099",
      price:200,
      description:'Peter Parker'
    },
    {
      id:2,
      title:'Goosebupps',
      imgUrl:"https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2023/05/house-of-shivers.jpg?resize=740%2C1075&ssl=1",
      price:200,
      description:'Peter Parker'
    }
  ]);

  // await knex('users').insert({
  //   id:1,
  //   name:"Anil",
  //   email:"ak@anil.com"
  // })
};
