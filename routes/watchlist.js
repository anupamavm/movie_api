const router = require('express').Router();
const Watchlist = require('../models/Watchlist');

router.post('/', async (req, res) => {
	try {
		const { userId, movieId } = req.body;

		// create new watchlist item
		const newWatchlistItem = new Watchlist({ userId, movieId });
		const savedWatchlistItem = await newWatchlistItem.save();

		res.json(savedWatchlistItem);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const watchlistItems = await Watchlist.find();
		res.json(watchlistItems);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const watchlistItem = await Watchlist.findById(req.params.id);
		if (!watchlistItem) {
			return res.status(404).json({ error: 'Watchlist item not found' });
		}
		res.json(watchlistItem);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const watchlistItem = await Watchlist.findById(req.params.id);
		if (!watchlistItem) {
			return res.status(404).json({ error: 'Watchlist item not found' });
		}

		await watchlistItem.delete();

		res.json({ message: 'Watchlist item deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
