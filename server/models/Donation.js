const mongoose = require('mongoose');

const { Schema } = mongoose;

const donationSchema = new Schema({
    donor: {
        type: String,
    },
    amount: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
    },
    productId: {
        type: String,
    },
    // product: [
    //     {
    //         type: Schema.Types.ObjectId,
    //         ref: 'Product'
    //     }
    // ]
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;