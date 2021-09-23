const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    unique: true,
  },
  productName: {
    type: String,
    required: [true, "Please provide product name"],
    unique: true,
    trim: true,
    maxlength: [30, "A Product name must not exceed 30 characters"],
    minlength: [2, "A Product name must be minimum 10 characters"],
  },
  qtyPerUnit: {
    type: Number,
    default: 1,
  },
  unitPrice: {
    type: Number,
    required: [true, "please specify the price of the product"],
  },
  unitInStock: {
    type: Number,
    required: [true, "please specify the no of units in stock"],
  },
  discontinued: {
    type: Boolean,
    default: false,
    select: false,
  },
  category: 
    {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    }
});




// Query Middleware
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    select: "categoryName categoryId -_id",
  });
  next();
});






const Product = mongoose.model("Product", productSchema);

module.exports = Product;
