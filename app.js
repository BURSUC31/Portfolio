const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Product = require("./models/product");
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError");
const app = express();
const productRoutes = require("./routes/products");
const profileRoutes = require("./routes/profile");
if (process.env.NODE_ENV === "production") {
  require("dotenv").config();
}
var DATAbURL = process.env.DATABASEURL;

mongoose.connect(
  "mongodb://localhost:27017/yelp-camp?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static("public"));

app.use("/Crud/", productRoutes);
app.use("/", profileRoutes);
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh no, something went wrong";
  res.status(statusCode).render("error", { err });
});
app.listen(3000, () => console.log("connection open on port 3000 "));
