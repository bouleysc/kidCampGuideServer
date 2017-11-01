const express = require('express');
const router = express.Router();
const queries = require('../db/queries');

router.get('/', (req,res) => {
  queries.getCamps().then(camps => {
    res.json(camps)
  })
})

router.get('/:id', (req,res) => {
  queries.getCampsById(req.params.id).then(camps => {
    res.json(camps)
  })
})

// 
// router.delete('/:id', (req,res) => {
//   res.send('hello')
// })

module.exports = router
