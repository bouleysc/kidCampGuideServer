
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "person_camp"; ALTER SEQUENCE person_camp_id_seq RESTART WITH 2')
    .then(function () {
      return knex('person_camp').insert([
        {id: 1, person_id: 1, camp_id: 1}
      ])
    });
};
