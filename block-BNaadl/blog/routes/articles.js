var express = require("express");

var Article = require("../modle/article");

var router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  res.render("articles");
});

router.get("/new", (req, res) => {
  res.render("addArticles");
});

router.post("/", (req, res, next) => {
  Article.create(req.body, (err, postArticle) => {
    console.log(req.body);
    if (err) return next(err);
    res.redirect("/articles");
  });
});

module.exports = router;
