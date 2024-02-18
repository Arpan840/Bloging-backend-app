const mongoose = require("mongoose");
const { Schema } = mongoose;

const followSchema = new Schema(
  {
    following: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    follower: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
  },
  {
    timeStamps: true,
  }
);

module.exports = mongoose.model("follow", followSchema);
