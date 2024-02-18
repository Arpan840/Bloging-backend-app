const UserSchema = require("../Schemas/User.Schema");

async function verifyFollowersId(followerId, followingId) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!followerId) {
        reject({ message: "Missing follower user id" });
      } else if (!followingId) {
        reject({ message: "Missing following user id" });
      }
      const followingData = await UserSchema.findOne({ _id: followingId });
      if (followingData) {
        resolve();
      }
    } catch (error) {
      reject({ message: error.message });
    }
  });
}
module.exports = { verifyFollowersId };
