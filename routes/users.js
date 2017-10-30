const express = require('express');
const router = express.Router();
const queries = require('../db/queries');
const knex = require('../db/knex');


router.get('/', (req,res) => {
  queries.getUsers().then(users => {
    res.json(users)
  })
})

router.get('/:id', (req, res, next) => {
  queries.getUsersById(req.params.id).then(users => {
    res.json(users)
  })
})

router.get('/:id/booked', (req, res, next) => {
  let id = req.params.id
  queries.getBookedCampsByUser(id).then(data=> {
    res.json(data)
  })
})

router.post('/:id/booked', (req, res, next) => {
    let personId = req.params.id
    let campId = req.body.id
    queries.addBookedCampsByUser(personId, campId).then(data=> {
      res.json(data)
    })
})


router.get('/:id/favorites', (req, res, next) => {
  let id = req.params.id
  queries.getFavoriteCampsByUser(id).then(data=> {
    res.json(data)
  })
})


router.post('/:id/favorites', (req, res, next) => {
  let personId = req.params.id
  let campId = req.body.id
  queries.addFavoriteCampsByUser(personId, campId).then(data=> {
    res.json(data)
  })
})

// router.delete('/:id/booked', (req, res, next) => {
//   let personId = req.params.id
//   let campId = req.body
//   console.log(campId)
//   queries.removeBookedCampByUser(personId, campId)
//   .then(camp => {
//     res.json(camp)
//   })
// })

router.delete('/:id/booked', (req, res, next) => {
  console.log(req.body);
  console.log(req.params.id);
  queries.removeBookedCampByUser(req.params.id, req.body)
  .then(camp => {
    res.json(camp)
  })
})

// router.delete('/:id', (req,res) => {
//   queries.getUsersById(req.params.id).then(users => {
//     res.json(users)
//   })
// })

module.exports = router
