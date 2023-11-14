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
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // Nếu bạn muốn chỉ cho phép gửi Refresh Token qua kênh HTTPS, hãy sử dụng secure: true
    secure: true,
  });
  return res.status(200).json({
    userId: newUser.id,
    email: newUser.email,
    password: newUser.password,
    accessToken,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //authentication
  let existUser = await db.User.findOne({ where: { email } });
  if (!existUser) return res.status(400).json("Email is not exist");
  let comparePassword = await existUser.isValidPassword(
    password,
    existUser.password
  );
  console.log("check pass" + comparePassword);
  if (!comparePassword) return res.status(400).json("Password do not match");
  //authorization
  let { accessToken, refreshToken } = generateToken(existUser.id);
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    // Nếu bạn muốn chỉ cho phép gửi Refresh Token qua kênh HTTPS, hãy sử dụng secure: true
    secure: true,
  });
  return res.status(200).json({
    userId: existUser.id,
    email: existUser.email,
    accessToken,
  });
});
const logout = asyncHandler(async (req, res) => {
  res
    .cookie("refreshToken", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
    })
    .send("Logged out successfully!");
});

module.exports = {
  register,
  login,
  logout,
};
