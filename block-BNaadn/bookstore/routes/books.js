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
  res.render("bookCreateForm");
});

router.post("/", (req, res, next) => {
  let data = req.body;
  console.log(data);
  Book.create(data, (err, book) => {
    console.log(data);
    if (err) return next(err);
    res.redirect("/books");
  });
});

router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, book) => {
    if (err) return next(err);
    console.log(book);
    res.render("singleBook", { book: book });
  });
});

router.get("/:id/edit", (req, res, next) => {
  let id = req.params.id;
  Book.findById(id, (err, books) => {
    if (err) return next(err);
    res.render("editForm", { books });
  });
});

router.post("/:id", (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndUpdate(id, req.body, (err, book) => {
    if (err) return next(err);
    res.redirect("/books/" + id);
  });
});

router.get("/:id/delete", (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndDelete(id, (err, book) => {
    if (err) return next(err);
    res.redirect("/books");
  });
});

module.exports = router;
