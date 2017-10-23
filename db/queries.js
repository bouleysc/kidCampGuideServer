const knex = require('./knex');

module.exports = {
  getCamps: function() {
    return knex('camp').select()
  },
  getCampsById: function(id) {
    return knex('camp').select().where('id', id)
  },
  getUsers: function() {
    return knex('person').select()
  },
  getUsersById: function(id) {
    return knex('person').select().where('id', id)
  }
}
