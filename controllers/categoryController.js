const Category = require("../models/categoryModel");

// Get all Categories
exports.getAllCategories = async (req, res) => {
  try {
    // EXECUTE QUERY
    const categories = await Category.find();

    // Send response
    res.status(200).json({
      status: "success",
      results: categories.length,
      categories
    });

  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);

    res.status(201).json({
      status: "success",
      category: newCategory,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get Category
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    res.status(200).json({
      status: "success",
      category
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });

    res.status(200).json({
      status: "success",
      category,
    });
    
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Delete category
exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
