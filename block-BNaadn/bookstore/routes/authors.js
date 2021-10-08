var express = require("express");
var router = express.Router();
var Author = require("../model/author");

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.render("authorCreateForm");
});

router.post("/new", (req, res, next) => {
  Author.create(req.body, (err, authors) => {
    if (err) return next(err);
    Author.populate
  });
});
module.exports = router;
