const express = require('express');
const app = express();
const cors = require('cors');
const knex = require('./db/knex');
const bodyParser = require('body-parser');
const campsRouter = require('./routes/camps')
const usersRouter = require('./routes/users')
const homeRouter = require('./routes/home')

app.use((req, res, next) => {
 res.header('Access-Control-Allow-Origin', req.headers.origin);
 res.header('Access-Control-Allow-Headers', 'Authorization');
 next();
})
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
 extended: false
}))
app.use('/camps', campsRouter);
app.use('/users', usersRouter);
app.use('/', homeRouter);

app.listen(process.env.PORT || 8080);
