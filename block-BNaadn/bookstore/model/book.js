var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    title: { type: String, required: true },

    summary: String,
    pages: { type: Number, default: 0 },
    publication: String,
    cover_image_url: {
      type: String,
      default:
        "https://www.mswordcoverpages.com/wp-content/uploads/2018/10/Book-cover-page-2-CRC.png",
    },
    category: String,
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  },
  { timestamps: true }
);

var Book = mongoose.model("Book", bookSchema);

module.exports = Book;
