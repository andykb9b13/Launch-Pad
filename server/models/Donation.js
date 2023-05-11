const mongoose = require('mongoose');

const { Schema } = mongoose;

const donationSchema = new Schema({
    donor: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    amount: {
        type: Number,
        required: true,
        trim: true
    },
    message: {
        type: String,
    },
    product: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;