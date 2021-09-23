const Product = require("../models/productModel");

exports.getAllProducts = async (req, res) => {
  try {
    // EXECUTE QUERY
    let query = Product.find();

    // Sorting 
    if(req.query.sort) {
      query = query.sort(req.query.sort.split(',').join(' '));
    }

    // Limit fields
    if(req.query.fields) {
      query = query.select(req.query.fields.split(',').join(' '));
    }
    

    let products = await query;

    // Send response
    res.status(200).json({
      status: "success",
      results: products.length,
      products
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Create Product
exports.createProduct = async (req, res) => {
  try {
    // Create New Product
    const newProduct = await Product.create(req.body);

    res.status(201).json({
      status: "success",
      product: newProduct,
    });

  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Get Product
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json({
      status: "success",
      product
    });

  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: false,
    });

    res.status(201).json({
      status: "success",
      product
    });
    
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

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
