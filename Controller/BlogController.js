const express = require("express");
const { verifyBlog } = require("../Utility/blog.Utility");
const {
  addBlog,
  Blogs,
  myBlogs,
  getBlog,
  editBlog,
  deleteBlog,
} = require("../Model/Blog.Model");
const BlogRouter = express.Router();

BlogRouter.post("/addBlog", async (req, res) => {
  try {
    const ID = req.session.user._id;
    const { title, description } = req.body;
    await verifyBlog(title, description);
    let data = await addBlog(title, description, ID);
    res.send({
      status: 200,
      message: "A new blog added successfully",
      data: data,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: error.message,
    });
  }
});

BlogRouter.get("/allBlogs", async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const blogData = await Blogs(skip, limit);
    const data = blogData[0].data;
    res.send({
      status: 200,
      data: data,
      message: "Successful",
    });
  } catch (error) {
    res.send({
      status: 400,
      message: error.message,
    });
  }
});

BlogRouter.get("/myBlog", async (req, res) => {
  try {
    const userId = req.session.user._id;
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    let blogs = await myBlogs(userId, skip, limit);
    res.send({
      status: 200,
      message: "success",
      data: blogs,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
});

BlogRouter.get("/getBlog", async (req, res) => {
  try {
    const { blogId } = req.body;
    const userId = req.session.user._id;
    const data = await getBlog(blogId, userId);
    res.send({
      status: 200,
      data: data,
      message: "success",
    });
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
});

BlogRouter.put("/editBlog", async (req, res) => {
  try {
    const { id, title, description } = req.body;
    const userId = req.session.user._id;
    console.log(userId, "userId");
    let data = await editBlog(id, userId, title, description);
    res.send({
      status: 200,
      message: "Successful",
      data: data,
    });
  } catch (error) {
    res.send({
      status: 500,
      message: error.message,
    });
  }
});

BlogRouter.delete("/blogDelete", async (req, res) => {
  const blogId = req.body.blogId;
  const userId = req.session.user._id;
  console.log(blogId, userId, "test");
  try {
    const data = await deleteBlog(blogId, userId);
    res.send({
      status: 201,
      message: "delete successful",
      deletedData: data,
    });
  } catch (error) {
    res.send({ status: 500, message: error.message });
  }
});

module.exports = BlogRouter;
