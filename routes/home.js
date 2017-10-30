const express = require('express');
const router = express.Router();
const cors = require('cors');
const queries = require('../db/queries');
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

router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    let email = req.body.email;
    let body = req.body;
    queries.signup(email)
      .then(user => {
        if (user.length === 0) {
          var hash = bcrypt.hashSync(req.body.password, 8)
          req.body.password = hash
          queries.addUser(body)
            .then(user => {
              delete user[0].password
              const token = jwt.sign(user[0].id, process.env.TOKEN_SECRET);
              res.json({
                data: token
              })
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
  if (req.body.email !== undefined || req.body.password !== undefined) {
    let email = req.body.email;
    queries.login(email)
    .then(user => {
      if (user.length === 0) {
        res.json({
          error: 'Email or password did not match'
        })
      } else {
        const match = bcrypt.compareSync(req.body.password, user[0].password)
        if(match) {
          delete user[0].password
          const token = jwt.sign(user[0].id, process.env.TOKEN_SECRET);
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
  } else {
    res.json({
      error: 'please enter an email'
    })
  }
})


router.get('/book', (req, res) => {
  knex('person_camp').then(data => {
    console.log(data);
    res.json(data)
  })
})

module.exports = router;
