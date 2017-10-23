const bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return knex.raw('DELETE FROM "person"; ALTER SEQUENCE person_id_seq RESTART WITH 2')
    .then(function () {
      var hash1 = bcrypt.hashSync('sally', 8)
      var people = [{
        id: 1,
        first_name: 'Sally',
        last_name: 'Bouley',
        email: 'sally@sally.com',
        password: hash1
      }]
    return knex('person').insert(people);
    });
};
