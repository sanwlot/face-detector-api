const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
require('dotenv').config();

const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;

const db = knex({
  client: 'pg',
  connection: dbURI, // Use the DB_URI environment variable 
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  db.select('*')
    .from('users')
    .then((users) => res.json(users))
    .catch((error) => res.status(500).json({ error: 'Unable to fetch users' }));
});

app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profile.handleProfile(req, res, db));
app.put('/image', (req, res) => image.handleImage(req, res, db));

app.listen(port, () => {
  console.log(`App is running on PORT: ${port}`);
});
