const express = require("express");
const {
  followUser,
  followerList,
  unfollowUser,
  followingList,
} = require("../Model/Follow.Model");
const { verifyFollowersId } = require("../Utility/following.Utility");
const FolloeRouter = express.Router();

FolloeRouter.post("/followUser", async (req, res) => {
  try {
    const followerId = req.session.user._id;
    const followingId = req.body.followingId;
    await verifyFollowersId(followerId, followingId);
    const data = await followUser(followerId, followingId);
    res.send({
      status: 200,
      message: "Followed Successfully",
      data: data,
    });
  } catch (error) {
    res.send({
      status: error.status || 500,
      message: error.message,
    });
  }
});

FolloeRouter.get("/followersList", async (req, res) => {
  const userId = req.session.user._id;
  const skip = Number(req.query.skip) || 0;
  const limit = Number(req.query.limit) || 10;
  try {
    const data = await followerList(userId, skip, limit);
    res.send({
      status: 200,
      data: data,
      message: "Followers List",
    });
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
});

FolloeRouter.post("/unfollow", async (req, res) => {
  const followerId = req.session.user._id;
  const unfollowId = req.body.unfollowId;
  console.log(followerId,unfollowId)
  try {
    const data = await unfollowUser(followerId, unfollowId);
    res.send({
      status: 200,
      data: data,
      message: "Unfollowed",
    });
  } catch (error) {
    res.send({
      status: 200,
      message: error.message,
    });
  }
});

FolloeRouter.get("/followingList",async(req,res)=>{
    const userId = req.session.user._id;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const data = await followingList(userId,skip,limit)
        res.send({
            status:200,
            data:data,
            message:"Following"
        })
    } catch (error) {
        res.send({
            status:500,
            message:error.message
        })
    }
})

module.exports = FolloeRouter;
