const express = require("express");
const router = express.Router();
const db = require('../models')
// Home page route.
router.get("/", async function (req, res) {
  const jane = await db.User.create({ firstName: "Jane", lastName: "Doe" });
  res.send("Wiki home page");
});

// About page route.
router.get("/about", function (req, res) {
  res.send("About this wiki");
});

module.exports = router;