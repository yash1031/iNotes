const mongoose= require('mongoose');
require('dotenv').config();

const mongoURI= process.env.REACT_APP_mongoURI

const DBName= process.env.REACT_APP_DB_NAME

let connectToMongo =  async ()=>{
    try {
       await mongoose.connect(`${mongoURI}/${DBName}`)
       let dbName = mongoose.connection.db.databaseName;
       return ["Success", dbName];
    }catch{(error)=>{
        return ["Failure", error];
    }}
  }

module.exports= {connectToMongo};   