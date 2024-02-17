const express = require("express");
const { register, login } = require("../Model/User.Model");
const isAuth = require("../MiddelWare/isAuth.middleware");
const AuthRouter = express.Router();

AuthRouter.post("/signUp", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    let data = await register(userName, email, password);
    
    res.send({
      status: 200,
      message: "SignUp Successful",
      data: data,
    });
  } catch (error) {
    res.send({
      status: 400,
      message: error.message,
    });
  }
});

AuthRouter.post("/login", async (req, res) => {
  const { LoginId, password } = req.body;
  try {
    let user = await login({LoginId, password});
    req.session.isAuth = true
    req.session.user = {
      _id: user._id,
      email: user.email,
      userName: user.userName
    }
    res.send({
      status: 200,
      message: "Login Successful",
    });
  } catch (error) {
    res.send({
      status: "400",
      message: error.message,
    });
  }
});
// Logout Functionality
AuthRouter.delete("/Logout",isAuth,(req,res)=>{
  req.session.destroy((err)=>{
    if(err)
    {res.send({
      status: 400,
      message: err.message
    })
  }
  res.send({
    status: 200,
    message: "Logout Successfully"
  })
  })

})

AuthRouter.get("/dashbord",isAuth,(req,res)=>{
   res.send({message:"Dashbord"})
})

module.exports = AuthRouter;
