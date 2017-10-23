
exports.up = function(knex, Promise) {
  return knex.schema.createTable('person', (table) => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.text('email').notNullable().unique();
    table.text('password').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('person');
};
