var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var articleSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    tag: { type: String },
    author: { type: String },
    likes: { type: Number },
  },
  { timestamps: true }
);

var Article = mongoose.model("Article", articleSchema);

module.exports = Article;
