var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var commentSchema = new Schema(
  {
    content: { type: String, required: true },
    articalId: { type: Schema.Types.ObjectId, required: true },
    likes: { type: Number, default: 0 },
    author: { type: String },
  },
  { timestamps: true }
);
var Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
