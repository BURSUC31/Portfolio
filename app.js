const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
const orice = "asdasd";
app.get("/", (req, res) => {
  res.render("home", { orice });
});
app.get("/:id", (req, res) => {
  const { id } = req.params;
  res.render("show", { id });
});

app.listen(3000, () => console.log("connection open on port 3000 "));
