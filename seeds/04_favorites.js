
exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "favorites"; ALTER SEQUENCE favorites_id_seq RESTART WITH 2')
    .then(function () {
      return knex('favorites').insert([
        {id: 1, person_id: 1, camp_id: 5}
      ])
    });
};
