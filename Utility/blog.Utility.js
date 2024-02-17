function verifyBlog(title, description) {
  return new Promise((resolve, reject) => {
    if (!title) {
      reject({ message: "Title is requires" });
    } else if (!description) {
      reject({ message: "Description is required" });
    }
    resolve();
  });
}

module.exports = { verifyBlog };
