const express = require("express");
const databaseConnection = require("./db");
const AuthRouter = require("./Controller/AuthController");
const app = express();
require("dotenv").config();
app.use(express.json())
const port = parseInt(process.env.Port);
const expressSession = require("express-session");
const BlogRouter = require("./Controller/BlogController");
const isAuth = require("./MiddelWare/isAuth.middleware");
const MongoDBStore = require('connect-mongodb-session')(expressSession)
const store = new MongoDBStore({
  uri: process.env.Database,
  collection: 'mySessions'
});
app.use(expressSession({
  secret: process.env.secret,
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use('/auth',AuthRouter);
app.use('/blog',isAuth,BlogRouter);

app.listen(port, () => {
  console.log(`Server is running on Localhost:${port}`);
});