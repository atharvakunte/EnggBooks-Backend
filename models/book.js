var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    authors: {
      type: String,
      required: true,
      maxlength: 50,
    },
    publication: {
      type: String,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: ObjectId,
      ref: "subCategory",
      required: true,
    },
    ilink: {
      type: String,
      required: true,
      trim: true,
    },
    dlink: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

bookSchema.index({ name: "text", authors: "text", publication: "text" });

module.exports = mongoose.model("Book", bookSchema);
