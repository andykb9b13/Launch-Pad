const mongoose = require("mongoose");

const { Schema } = mongoose;

const donationSchema = new Schema({
  donor: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
    trim: true,
  },
  message: {
    type: String,
  },
  productId: {
    type: String,
  },
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
