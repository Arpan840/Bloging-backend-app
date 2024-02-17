const validator = require("validator");
const bcrypt = require("bcrypt");
const UserSchema = require("../Schemas/User.Schema");
require("dotenv").config();
const saltRound = parseInt(process.env.Salt);

function validateUser(userName, email, password) {
  return new Promise((resolve, reject) => {
    if (!userName && typeof userName !== "string") {
      reject({
        status: 200,
        message: "userName is required",
      });
    } else if (!email && typeof email !== "string") {
      reject({ message: "Email is required" });
    } else if (!password && typeof password !== "string") {
      reject({ message: "Password is required" });
    } else if (!validator.isEmail(email)) {
      reject("Invalid Email");
    } else if (!validator.isStrongPassword(password)) {
      reject({ message: "Weak password" });
    }
    resolve();
  });
}

async function hashPassword(password) {
  const hashingPassword = await bcrypt.hash(password, saltRound);
  return hashingPassword;
}

function checkDuplicateUserNameAndEmail(userName, email) {
  return new Promise(async (resolve, reject) => {
    let userExist = await UserSchema.findOne({
      $or: [{ userName }, { email }],
    });
    if (userExist && userExist.userName === userName) {
      reject({ message: "userName already exist" });
    }
    if (userExist && userExist.email === email) {
      reject({ message: "email already exist" });
    }
    resolve();
  });
}

const validateLoginInput=({LoginId,password})=>{
 return new Promise(async(resolve,reject)=>{
   if(!LoginId){
    reject({message:"loginId is required"})
   }
   else if(LoginId){
    const user = await  UserSchema.findOne({$or: [{email:LoginId},{userName:LoginId}]});
    if(user){
      let passwordMatched = await bcrypt.compare(password,user.password)
      if(!passwordMatched)
      {
        reject({message:"Invalid userId or password"})
      }
      else{
        resolve(user)
      }
    }
    else{
      reject({message:"User not found"})
    }
   }
   if(!password){
    reject({message:"password is required"})
   }
   resolve()
 })
}

module.exports = { validateUser, hashPassword, checkDuplicateUserNameAndEmail, validateLoginInput };
