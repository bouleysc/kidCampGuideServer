const express = require('express');
const router = express.Router();
const cors = require('cors');
const knex = require('../db/knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
// const queries = require('../db/queries');

function validUser(user) {
  let validFirstName = typeof user.first_name === 'string' && user.first_name.trim() !== '' && user.first_name != null;
  let validLastName = typeof user.last_name === 'string' && user.last_name.trim() !== '' && user.last_name != null;
  let validEmail = typeof user.email === 'string' && user.email.match(/([@])/g) != null;
  let validPassword = typeof user.password === 'string' && user.password.trim() != '';
  return validFirstName && validLastName && validEmail && validPassword;
}

// router.post('/signup', (req,res) => {
//   queries.createUser(req.body).then(user => {
//     res.send(user)
//   })
// })
router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    knex('person').where('email', req.body.email)
      .then(user => {
        if (user.length === 0) {
          var hash = bcrypt.hashSync(req.body.password, 8)
          req.body.password = hash
          knex('person').insert(req.body).returning('*')
            .then(user => {
              delete user[0].password
              var token = jwt.sign(Object.assign({}, user[0].id), process.env.TOKEN_SECRET);
              res.json({data: token})
            })
        } else {
          res.json({
            error: 'email already in use'
          });
        }
      })
  } else {
    res.json({
      error: 'Invalid inputs.'
    })
  }
});

router.post('/login', function(req, res, next) {
  knex('person').where('email', req.body.email)
    .then(user => {
      if (user.length === 0) {
        res.json({
          error: 'Email or password did not match'
        })
      } else {
        var match = bcrypt.compareSync(req.body.password, user[0].password)
        if (match) {
          delete user[0].password
          var token = jwt.sign(Object.assign({}, user[0].id), process.env.TOKEN_SECRET);
          res.json({
            data: token
          })
        } else {
          res.json({
            error: 'Email or password did not match'
          })
        }
      }
    })
});

module.exports = router;
