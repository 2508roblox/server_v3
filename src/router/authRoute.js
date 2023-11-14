const express = require("express");
const router = express.Router();
const db = require('../models');
import authController from '../controllers/authController'
import { verifyTokenMiddleware } from '../middleware/authMiddleware';
// Home page route.
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refresh);

// About page route.
router.get("/about", verifyTokenMiddleware, function (req, res) {
  res.sendStatus(200);
});

module.exports = router;