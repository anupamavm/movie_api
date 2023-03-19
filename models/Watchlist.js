const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	movies: {
		type: [
			{
				movieId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: 'Movie',
					required: true,
				},
				addedOn: {
					type: Date,
					required: true,
					default: Date.now,
				},
			},
		],
		required: true,
	},
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);

module.exports = Watchlist;
