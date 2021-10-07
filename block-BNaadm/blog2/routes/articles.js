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

router.get("/:id", (req, res, next) => {
  var id = req.params.id;
  // Article.findById(id, (err, article) => {
  //   if (err) return next(err);
  //   res.render("singleArticle", { article });
  // });
  
  Article.findById(id)
    .populate("comments")
    .exec((err, article) => {
      if (err) return next(err);
      res.render("singleArticle", { article });
    });
});

router.get("/:id/edit", (req, res, next) => {
  var id = req.params.id;
  Article.findById(id, (err, article) => {
    if (err) return next(err);
    res.render("editArticle", { article });
  });
});
//increment
router.get("/:id/likes", (req, res, next) => {
  var id = req.params.id;
  Article.findByIdAndUpdate(id, { $inc: { likes: 1 } }, (err, article) => {
    if (err) return next(err);
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

//comments
router.post("/:articleId/comments", (req, res, next) => {
  var articleId = req.params.articleId;
  console.log(req.body);
  req.body.articleId = articleId;
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    res.redirect("/articles/" + articleId);
    Article.findByIdAndUpdate(
      articleId,
      { $push: { comments: comment.id } },
      (err, article) => {
        if (err) return next(err);
        res.render("/articles/" + articleId);
      }
    );
  });
});
module.exports = router;
