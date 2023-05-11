const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  funding: {
    type: String,
    required: true,
  },
  externalLink: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  // donor: [] //come back to this - donor model references Product, so i don't think we need to reference Donor in Product model
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
