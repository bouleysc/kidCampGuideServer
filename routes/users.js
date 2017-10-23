const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', (req,res) => {
  queries.getUsers().then(users => {
    res.json(users)
  })
})

router.get('/:id', (req,res) => {
  queries.getUsersById(req.params.id).then(users => {
    res.json(users)
  })
})

router.delete('/:id', (req,res) => {
  queries.getUsersById(req.params.id).then(users => {
    res.json(users)
  })
})

module.exports = router
