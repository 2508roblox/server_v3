const express = require("express");
const router = express.Router();
const db = require('../models');
import authController from '../controllers/authController'
// Home page route.
router.get("/register", authController.register);
router.get("/login", authController.login);

// About page route.
router.get("/about", function (req, res) {
  res.send("About this wiki");
});

module.exports = router;