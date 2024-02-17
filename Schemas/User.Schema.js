const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
  userName:{
    type: String,
    required: true,
    unique:true
  },
  email:{
    type: String,
    require: true,
    unique:true,
  },
  password:{
    type: String,
    require: true,
    min: 8
  }
  });
  module.exports = mongoose.model("User",userSchema);