const express = require('express')
const cors = require('cors')
const knex = require('knex') 
const bcrypt = require('bcrypt-nodejs')
const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: { 
    host : '127.0.0.1',
    port : 5432,
    user : 'ajaysanwlot',
    password : '',
    database : 'smart-brain'
  }
});

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => db.select('*').from('users').then(users => res.json(users)))
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt))
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt))
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db))
app.put('/image', (req, res) => image.handleImage(req, res, db))

app.listen(3000, () => {
  console.log("App is running of PORT:3000")
})

// ajay sanwlot