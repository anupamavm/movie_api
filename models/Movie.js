const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	year: {
		type: Number,
		required: true,
		min: 1800,
		max: 9999,
	},
	genre: {
		type: [String],
		required: true,
		trim: true,
	},
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
