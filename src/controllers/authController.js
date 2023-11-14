import asyncHandler from "express-async-handler";
import db from "../models";
import { generateToken } from "../utils/generateToken";

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //authentication
  let existUser = await db.User.findOne({ where: { email } });
  if (existUser) return res.status(400).json("email has already been using");
  let newUser = await db.User.create({ email, password });
  //authorization
  let { accessToken, refreshToken } = generateToken(newUser.id);

  return res.status(200).json({
    userId: newUser.id,
    email: newUser.email,
    password: newUser.password,
     accessToken,
      refreshToken
     });
});
    const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //authentication
    let existUser = await db.User.findOne({ where: { email } });
    if (!existUser) return res.status(400).json("Email is not exist");
    console.log(existUser)
    if (await existUser.isValidPassword(existUser.password, password)) {
        console.log('match')
    }else {
        console.log('not match')

    }
    //authorization
    let { accessToken, refreshToken } = generateToken(newUser.id);

    return res.status(200).json({
        userId: newUser.id,
        email: newUser.email,
        accessToken,
        refreshToken
        });
    });
module.exports = {
  register,
  login
};
