const router = require('express').Router();
const Movie = require('../models/Movie');

router.post('/', async (req, res) => {
	try {
		const { title, year, genre } = req.body;

		// create new movie
		const newMovie = new Movie({ title, year, genre });
		const savedMovie = await newMovie.save();

		res.json(savedMovie);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const movies = await Movie.find();
		res.json(movies);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		if (!movie) {
			return res.status(404).json({ error: 'Movie not found' });
		}
		res.json(movie);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.patch('/:id', async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		if (!movie) {
			return res.status(404).json({ error: 'Movie not found' });
		}

		const { title, year, genre } = req.body;

		// update movie properties
		if (title) {
			movie.title = title;
		}
		if (year) {
			movie.year = year;
		}
		if (genre) {
			movie.genre = genre;
		}

		const savedMovie = await movie.save();

		res.json(savedMovie);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		if (!movie) {
			return res.status(404).json({ error: 'Movie not found' });
		}

		await movie.delete();

		res.json({ message: 'Movie deleted successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
