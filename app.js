const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const mongoose = require("mongoose");
const Product = require("./models/product");
const methodOverride = require("method-override");

const app = express();
const connectionProduction =
  "mongodb+srv://mojfrt:gojineata1@cluster0.7ssn1.mongodb.net/blabla";
mongoose.connect("mongodb://localhost:27017/tester" || connectionProduction, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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
app.get("/about", (req, res) => {
  res.render("./products/about");
});
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.render("./products/show", { product });
});
app.get("/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  res.render("./products/edit", { product });
});
app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, { ...req.body.product });
  res.redirect(`/${product._id}`);
});
app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(3000, () => console.log("connection open on port 3000 "));
