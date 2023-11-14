const express = require("express");
const router = express.Router();
const db = require('../models');
import authController from '../controllers/authController'
// Home page route.
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.logout);

// About page route.
router.get("/about", function (req, res) {
  res.send("About this wiki");
});

module.exports = router;