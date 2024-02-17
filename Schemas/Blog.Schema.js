const mongoose= require('mongoose')
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    require: true,
  }, 
  description:{
    type: String,
    require: true
  },
  userId:{
    type: Schema.Types.ObjectId,
    require: true,
    ref: "User"
  }

},{
    timestamps: true
});
module.exports = mongoose.model( "Blog", blogSchema);