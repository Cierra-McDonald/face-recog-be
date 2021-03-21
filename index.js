const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const bcrypt = require('bcrypt-nodejs')
const knex = require('knex')
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'cierramcdonald',
      password : '',
      database : 'smart-brain'
    }
  });
const register = require('./controllers/register');
const signin = require('./controllers/SignIn');
const profile = require('./controllers/Profile');
const updateImage = require('./controllers/Image');
const imageUrl = require('./controllers/Image');


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => { 
    res.send('success')
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { updateImage.handleImageUpdate(req, res, db)})

app.post('/imageurl', (req, res) => { imageUrl.handleAPICall(req, res)})


app.listen(process.env.PORT || 3000, ()=> { 
    console.log(`app is running on port ${process.env.PORT}`);
})


