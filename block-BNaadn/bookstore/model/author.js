var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var authorSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, match: /@/ },
    country: String,
    bookId: [{ type: Schema.Types.ObjectId, ref: "Author" }],
  },
  { timestamps: true }
);

var Author = mongoose.model("Author", authorSchema);

module.exports = Author;
