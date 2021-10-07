var express = require("express");
var router = express.Router();
var Book = require("../model/book");
var Author = require("../model/author");

/* GET users listing. */
router.get("/", (req, res, next) => {
  Book.find({}, (err, book) => {
    if (err) return next(err);
    res.render("books", { book });
  });
});

router.get("/new", (req, res) => {
  res.render("AddBook");
});

router.post("/", (req, res, next) => {
  var id = req.params.id;
  Book.create(id, (err, book) => {
    if (err) return next(err);
    res.redirect("/books");
  });
});

module.exports = router;
