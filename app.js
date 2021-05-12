const express = require("express");

const app = express();
app.get("/", (req, res) => {
  res.send("asdasdasdasdasd");
});
app.listen(3000, () => console.log("connection open on port 3000"));
