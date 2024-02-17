const UserSchema = require("../Schemas/User.Schema");
const { validateUser, hashPassword, checkDuplicateUserNameAndEmail, validateLoginInput } = require("../Utility/user.Utility");

async function register(userName, email, password) {
    await validateUser(userName, email, password);
    await checkDuplicateUserNameAndEmail(userName,email)
    let passwordHashed = await hashPassword(password);
    const data = {
      userName,
      email,
      password: passwordHashed,
    };
    return await UserSchema.create(data);
}

async function login({LoginId,password}){
  let userdata = await validateLoginInput({LoginId,password})
  return userdata
}

module.exports = {register, login}
