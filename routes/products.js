const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Product = require("../models/product");
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.render("./products/home", { products });
});
router.post(
  "/",
  catchAsync(async (req, res) => {
    const product = new Product(req.body.product);
    await product.save();
    res.redirect("/");
  })
);

router.get(
  "/new",
  catchAsync(async (req, res) => {
    res.render("./products/new");
  })
);
router.get("/about", (req, res) => {
  res.render("./products/about");
});
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.render("./products/show", { product });
  })
);
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);

    res.render("./products/edit", { product });
  })
);
module.exports = router;
