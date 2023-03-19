const router = require('express').Router();
const Review = require('../models/Review');

router.post('/', async (req, res) => {
	try {
		const { userId, movieId, rating, comment } = req.body;

		// create new review
		const newReview = new Review({ userId, movieId, rating, comment });
		const savedReview = await newReview.save();

		res.json(savedReview);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const reviews = await Review.find();
		res.json(reviews);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);
		if (!review) {
			return res.status(404).json({ error: 'Review not found' });
		}
		res.json(review);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);
		if (!review) {
			return res.status(404).json({ error: 'Review not found' });
		}

		const { rating, comment } = req.body;

		// update review properties
		if (rating) {
			review.rating = rating;
		}
		if (comment) {
			review.comment = comment;
		}

		const savedReview = await review.save();

		res.json(savedReview);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const review = await Review.findById(req.params.id);
		if (!review) {
			return res.status(404).json({ error: 'Review not found' });
		}

		await review.delete();

		res.json({ message: 'Review deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
