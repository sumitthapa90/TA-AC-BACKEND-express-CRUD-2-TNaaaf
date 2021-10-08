var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    title: { type: String, required: true },
    authorId: { type: Schema.Types.ObjectId, ref: "Author" },
    summary: String,
    pages: { type: Number, default: 0 },
    publication: String,
    cover_image: { type: String },
    category: String,
  },
  { timestamps: true }
);

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;
