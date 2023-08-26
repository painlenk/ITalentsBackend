const express = require("express");
const router = express.Router();
const data = require("../../data/products.json");

router.get("/", (req, res) => {
  console.log("fez o get");
  res.send(data);
});

module.exports = router;
