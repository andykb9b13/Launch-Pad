const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ] // come back to this
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;