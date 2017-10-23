
exports.up = function(knex, Promise) {
  return knex.schema.createTable('camp', (table) => {
    table.increments();
    table.text('organization_name').notNullable();
    table.text('program_name').notNullable();
    table.text('program_address').notNullable();
    table.string('program_city').notNullable();
    table.string('program_state').notNullable();
    table.integer('zipcode').notNullable();
    table.string('program_phone').notNullable();
    table.string('program_website').notNullable();
    table.string('program_type').notNullable();
    table.text('program_description', 'longtext').notNullable();
    table.string('participant_gender').notNullable();
    table.integer('participant_age_min').notNullable();
    table.integer('participant_age_max').notNullable();
    table.date('program_start_date').notNullable();
    table.date('program_end_date').notNullable();
    table.time('program_start_time').notNullable();
    table.time('program_end_time').notNullable();
    table.boolean('overnight');
    table.boolean('full_day');
    table.boolean('part_day');
    table.integer('cost').notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('camp');
};
