var express = require("express");

var router = express.Router();
var Comment = require("../model/comment");

router.get("/:commentId/edit", (req, res, next) => {
  var commentId = req.params.commentId;
  Comment.findById(commentId, (err, comment) => {
    if (err) return next(err);
    res.render("editComment", { comment });
  });
});

router.post("/:id", (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndUpdate(id, req.body, (err, comment) => {
    if (err) return next(err);
    res.redirect("/articles/" + comment.articleId);
  });
});

router.get("/:id/delete", (req, res, next) => {
  var id = req.params.id;
  Comment.findByIdAndDelete(id, (err, comment) => {
    if (err) return next(err);
    res.redirect("/articles/"+ comment.articleId);
  });
});

module.exports = router;
