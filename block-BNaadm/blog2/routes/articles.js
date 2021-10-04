var express = require("express");
var Article = require("../model/article");
var Comment = require("../model/comment");

var router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  Article.find({}, (err, articles) => {
    if (err) return next(err);
    res.render("articles", { articles: articles });
  });
});

router.get("/new", (req, res) => {
  res.render("addArticle");
});

router.post("/", (req, res, nex) => {
  console.log(req.body);
  Article.create(req.body, (err, article) => {
    if (err) return next(err);
    console.log(err, article);
    res.redirect("articles");
  });
});

// router.get("/:id", (req, res, next) => {
//   var id = req.params.id;
//   Article.findById(id, (err, article) => {
//     if (err) return next(err);
//     res.render("singleArticle", { article });
//   });
// });

router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render("editArticle", { article });
  });
});
//increment
router.get("/:id/like", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { like: 1 } }, (err, article) => {
    res.redirect("/articles/" + id);
  });
});

router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, req.body, (err, update) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Article.findOneAndDelete(id, (err, deleteItem) => {
    if (err) return next(err);
    res.redirect("/articles");
  });
});

router.post("/:id/comments", (req, res, next) => {
  var id = req.params.id;
  req.body.articalId = id;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    res.redirect("/articles/" + id);
  });
});

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    Comment.find({ articalId: id }, (err, comments) => {
      if (err) return next(err);
      res.render("singleArticle", { article, comments });
    });
  });
});

module.exports = router;
