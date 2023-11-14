import asyncHandler from "express-async-handler";
import db from "../models";
import { generateToken, verifyToken } from "../utils/generateToken";

const handleCookieOptions = {
  httpOnly: true,
  secure: true,
};

const register = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existUser = await db.User.findOne({ where: { email } });
  if (existUser) {
    return res.status(400).json("Email is already used");
  }

  const newUser = await db.User.create({ email, password });

  const { accessToken, refreshToken } = generateToken({ userId: newUser.id });
  res.cookie("refreshToken", refreshToken, handleCookieOptions);

  return res.status(200).json({
    userId: newUser.id,
    email: newUser.email,
    accessToken,
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existUser = await db.User.findOne({ where: { email } });
  if (!existUser) {
    return res.status(400).json("Email does not exist");
  }

  const comparePassword = await existUser.isValidPassword(password, existUser.password);
  if (!comparePassword) {
    return res.status(400).json("Password does not match");
  }

  const { accessToken, refreshToken } = generateToken({ userId: existUser.id });
  res.cookie("refreshToken", refreshToken, handleCookieOptions);

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

const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    return res.status(401).json({ message: "Not Authenticated" });
  }

  try {
    const decoded = verifyToken(refreshToken, "refresh");
    const { userId } = decoded;

    const { accessToken } = generateToken({ userId });

    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
});

module.exports = { register, login, logout, refresh };