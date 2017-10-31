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
  },
  login: function(email) {
    return knex('person').where('email', email).returning('*')
  },
  signup: function(email) {
    return knex('person').where('email', email)
  },
  addUser: function (body) {
    return knex('person').insert(body).returning('*')
  },
  getBookedCampsByUser: function (id) {
    return knex('camp').select('*')
    .innerJoin('person_camp', 'camp.id', 'person_camp.camp_id')
    .innerJoin('person', 'person.id', 'person_camp.person_id')
    .where('person.id', id)
  },
  addBookedCampsByUser: function (personId,campId) {
    return knex('person_camp').insert([
        {person_id: personId, camp_id: campId}
      ])
  },
  removeBookedCampByUser: function(personId,campId) {
    return knex('person_camp').where({
      person_id: personId,
      camp_id: campId
    })
    .del()
  },
  getFavoriteCampsByUser: function (id) {
    return knex('camp').select('*')
    .innerJoin('favorites', 'camp.id', 'favorites.camp_id')
    .innerJoin('person', 'person.id', 'favorites.person_id')
    .where('person.id', id)
  },
  addFavoriteCampsByUser: function (personId,campId) {
    return knex('favorites').insert([
        {person_id: personId, camp_id: campId}
      ])
  },
  removeFavoriteCampByUser: function(personId,campId) {
    return knex('favorites').where({
      person_id: personId,
      camp_id: campId
    })
    .del()
  }
}
