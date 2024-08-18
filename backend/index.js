
const express = require('express'); 
var cors= require('cors');
const bodyParser = require('body-parser')
const {connectToMongo}= require('./db');
require('dotenv').config();

const User= require('./models/User');
const { body, validationResult } = require('express-validator'); 

// Package for encrypting the password
const bcrypt= require('bcryptjs');

// Package for creating JWT
var jwt= require('jsonwebtoken');
var fetchuser= require('./middleWare/fetchUser.js');

// Secret String to create JWT Signature
const JWT_SECRET= process.env.REACT_APP_JWT_SECRET;

const startApp = async ()  => {
  try {
    let db = await connectToMongo();
    console.log('Database name in app.js:', db);
    module.exports= "Hello" 
    // Continue with the rest of your app logic
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

startApp();
const app = express();
const port = process.env.REACT_APP_PORT; 

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.get('/api/v1/signup', (req, res) => {
  res.send('Hello Signup!')
})

app.get('/api/v1/login', (req, res) => {
  res.send('Hello Login!')
})
 
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()); //middleware to send JSON data through requests 
app.use(cors());

const router= express.Router();

app.post('/test', async(req,res)=>{
  console.log(req.body);
  res.status(200).send("All Well");
})


//Available Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes')); 


//Meaning of the app running on the below port
app.listen(port, async () => {
  console.log(`iNotebook backend listening on port ${port}`);
})
// module.exports= "Hello"; 