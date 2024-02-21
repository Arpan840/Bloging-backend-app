const BlogSchema = require("../Schemas/Blog.Schema");

async function addBlog(title, description, ID) {
  const blogData = {
    title: title,
    description: description,
    userId: ID,
  };
  return await BlogSchema.create(blogData);
}

async function Blogs(personIamFollowing, skip, limit) {
  // Get all the blogs from the database and sort them by date in descending order
  const data = await BlogSchema.aggregate([
    {
      $facet: {
        matchedBlogs: [
          { $match: {$and: [
            { userId: { $in: personIamFollowing } },
            { isDeleted: { $ne: true } }
          ]}},
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        unmatchedBlogs: [
          { $match: {$and: [
            { userId: { $nin: personIamFollowing } },
            { isDeleted: { $ne: true } }
          ]} },
          { $sort: { createdAt: -1 } },
          { $limit: limit },
        ],
      },
    },
    {
      $project: {
        blogs: { $concatArrays: ["$matchedBlogs", "$unmatchedBlogs"] },
      },
    },
  ]);
  return data[0].blogs;
}

async function myBlogs(userId, skip, limit) {
  const blogs = await BlogSchema.aggregate([
    { $sort: { createdAt: -1 } },
    {
      $match: { userId: userId, isDeleted: {$ne:!true} },
    },
    {
      $facet: {
        data: [{ $skip: skip }, { $limit: limit }],
      },
    },
  ]);
  return blogs;
}

async function getBlog(blogId, userId) {
  return new Promise(async (resolve, reject) => {
    const blog = await BlogSchema.findOne({
      $and: [{ _id: blogId }, { userId: userId }],
    });
    if (blog) {
      return resolve(blog);
    } else {
      reject({
        message: "This blog not belongs to this user or blog dosn't exist",
      });
    }
  });
}

async function editBlog(id, userId, title, description) {
  return new Promise(async (resolve, reject) => {
    const data = await BlogSchema.findOneAndUpdate(
      { _id: id, userId: userId },
      { title, description },
      { new: true }
    );
    console.log(data);
    if (data) {
      resolve(data);
    } else {
      reject({
        message:
          "Either blog not belongs to this user or blog is not available",
      });
    }
  });
}

async function deleteBlog(id, userId) {
  try {
    //const data = await BlogSchema.findOneAndDelete({ _id: id, userId: userId });
    const data = await BlogSchema.findOneAndUpdate({_id: id, userId: userId},{isDeleted: true},{new:true})
    if (data) {
      return data;
    } else {
      throw new Error("The blog you are trying to delete does not exist.");
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { addBlog, Blogs, myBlogs, getBlog, editBlog, deleteBlog };
