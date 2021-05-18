const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Product = require("./models/product");
const methodOverride = require("method-override");
const product = require("./models/product");
const app = express();

mongoose.connect(
  "mongodb+srv://mojfrt:gojineata1@cluster0.7ssn1.mongodb.net/blabla",
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
const orice = "asdasd";
app.get("/", async (req, res) => {
  const products = await Product.find({});
  res.render("./products/home", { products });
});
app.post("/", async (req, res) => {
  const product = new Product(req.body.product);
  await product.save();
  res.redirect("/");
});

app.get("/new", async (req, res) => {
  res.render("./products/new");
});
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });

  res.render("./products/show", { product });
});

app.listen(3000, () => console.log("connection open on port 3000 "));
