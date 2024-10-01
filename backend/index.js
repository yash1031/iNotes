
const express = require('express'); 
var cors= require('cors');
const {connectToMongo}= require('./db');
require('dotenv').config();

const startApp = async ()  => {
  try {
    let res = await connectToMongo();
    if(res[0]== "Success") console.log('Connected to Database:', res[1]);
    if(res[0]== "Failure") console.log(error);
  } catch (error) {
    console.error('Failed to connect to DB:', error);
  }
};

startApp();
const app = express();
const port = process.env.REACT_APP_PORT; 
 
app.use(express.json()); //middleware to send JSON data through requests 
app.use(cors());

const router= express.Router();

//Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes')); 


//Meaning of the app running on the below port
app.listen(port, async () => {
  console.log(`iNotebook backend listening on port ${port}`);
})