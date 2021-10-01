var express = require("express");

var Article = require("../model/article");

var router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  Article.find({}, (err, articles) => {
    console.log(err, articles);
    if (err) return next(err);
    res.render("articles", { articles: articles });
  });
});

router.get("/new", (req, res) => {
  res.render("addArticle");
});

router.post("/", (req, res, next) => {
  Article.create(req.body, (err, createArticle) => {
    console.log(err, createArticle);
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render("singleArticle", { article: article });
  });
});

router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    article.tag = article.tag.join();
    if (err) return next(err);
    res.render("editForm", { article });
  });
});

router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, updateArticle) => {
    console.log(err, updateArticle);
    article.tag = article.tag.split(" ");
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndDelete(id, (err, article) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.get("/:id/likes", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

module.exports = router;
