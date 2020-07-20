var mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

var subcategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    category: {
      type: ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subCategory", subcategorySchema);
