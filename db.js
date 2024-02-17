const mongoose = require('mongoose')
require('dotenv').config()
const database = process.env.Database

const databaseConnection=mongoose.connect(database).then(()=>{
    console.log("Connected to mongodb successfully")
}).catch((error)=>{
  console.log(error.message)
})

module.exports = databaseConnection;

