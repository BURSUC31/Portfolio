const express = require("express");

const app = express();
app.set("view engine", "ejs");

const orice = "asdasd";
app.get("/", (req, res) => {
  res.render("home", { orice });
});
app.get("/:id", (req, res) => {
  const { id } = req.params;
  res.render("show", { id });
});

app.listen(3000, () => console.log("connection open on port 3000 "));
