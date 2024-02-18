const FollowSchema = require("../Schemas/Follow.Schema");

async function followUser(followerId, followingId) {
  return new Promise(async (resolve, reject) => {
    try {
      const alreadyFollowing = await FollowSchema.findOne({
        follower: followerId,
        following: followingId,
      });
      if (alreadyFollowing) {
        reject({ message: "already following the user" });
        return;
      }
      let data = new FollowSchema({
        following: followingId,
        follower: followerId,
      });
      const followingData = await data.save();
      resolve(followingData);
    } catch (error) {
      reject(error.message);
    }
  });
}

async function followerList(userId, skip, limit) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await FollowSchema.find({ following: userId })
        .skip(skip)
        .limit(limit)
        .populate("follower")
        .exec();

      if (data.length === 0) {
        reject({ message: "You have no followers" });
      }

      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

async function unfollowUser(followerId, unfollowId) {
  try {
    return new Promise(async (resolve, reject) => {
      const data = await FollowSchema.findOneAndDelete({
        follower: followerId
      },
      {
        following: unfollowId,
      });

      if (!data) {
        reject({ message: "No such user to unfollow" });
      }
      resolve(data);
    });
  } catch (error) {
    reject(error.message);
  }
}

async function followingList(userId, skip, limit) {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await FollowSchema.find({ follower: userId })
        .skip(skip)
        .limit(limit)
        .populate("following")
        .exec();
      if (!data) {
        reject({ message: "You are not following anyone" });
      }
      resolve(data);
    } catch (error) {
      reject({ message: error.message });
    }
  });
}

module.exports = { followUser, followerList, unfollowUser,followingList };
