const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
router.get("/", async (req, res) => {
  res.render("./profile/home");
});
router.get("/resume", async (req, res) => {
  res.render("./profile/resume");
});
router.get("/projects", async (req, res) => {
  res.render("./profile/projects");
});
// router.get("/", async (req, res) => {});
// router.get("/", async (req, res) => {});
// router.get("/", async (req, res) => {});
// router.get("/", async (req, res) => {
// });

module.exports = router;
