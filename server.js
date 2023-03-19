const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const usersRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const reviewsRouter = require('./routes/reviews');
const watchlistsRouter = require('./routes/watchlists');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

app.use(express.json());

app.use('/users', usersRouter);
app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/watchlists', watchlistsRouter);

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
