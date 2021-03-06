
exports.up = function(knex, Promise) {
  return knex.schema.createTable('person_camp', (table) => {
    table.increments();
    table.integer('person_id').references('person.id').onDelete('CASCADE');
    table.integer('camp_id').references('camp.id').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('person_camp');
};
