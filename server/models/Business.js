const mongoose = require("mongoose");

const { Schema } = mongoose;

const businessSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  sponsor: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minLength: 25,
    maxLength: 2000,
  },
  location: {
    type: String,
    trim: true,
  },
  website: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  instagram: {
    type: String,
  },
  missionStatement: {
    type: String,
    minLength: 25,
  },
  imageUrl: {
    type: String,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Business = mongoose.model("Business", businessSchema);

module.exports = Business;
