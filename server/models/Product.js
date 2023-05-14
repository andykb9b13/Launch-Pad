const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSchema = new Schema({
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
    type: Number,
    required: true,
  },
  fundingGoal: {
    type: Number,
    required: true,
  },
  externalLink: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  businessId: {
    type: String,
  },
  donors: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  donations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Donation",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
