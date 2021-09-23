const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: String,
    unique: true,
  },
  categoryName: {
    type: String,
    required: [true, "Please provide category name"],
    unique: true,
  }
});


const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
