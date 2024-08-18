const mongoose= require('mongoose');
require('dotenv').config();

const mongoURI= process.env.REACT_APP_mongoURI

const DBName= process.env.REACT_APP_DB_NAME

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI).then(()=>{
//             console.log(dbName);
//            dbName = mongoose.connection.db.databaseName;
//            console.log(dbName)
//             console.log('Connected to database:', dbName);
//             return dbName;
//     }).catch((error)=>{
//         console.log("Database Connection error"+ error)
//     })
// } 

let connectToMongo =  async ()=>{
    try {
        console.log(DBName);
        console.log("mongoURI is: "+ `${mongoURI}/${DBName}`)
       await mongoose.connect(`${mongoURI}/${DBName}`)
        // console.log("Database connected successfully. Client is: "+ client.db())
        // console.log(dbName);
       let dbName = mongoose.connection.db.databaseName;
       console.log(dbName)
        // module.exports= dbName
        console.log('Connected to database:', dbName);
        return dbName;
    }catch{(error)=>{
        console.log("Database Connection error"+ error)
    }}
  }

// console.log("dbName is: "+ dbName);
module.exports= {connectToMongo};   