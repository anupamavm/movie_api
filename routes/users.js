const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async (req, res) => {
	try {
		const { username, email, password } = req.body;

		// check if user with the same username or email already exists
		const existingUser = await User.findOne({ $or: [{ username }, { email }] });
		if (existingUser) {
			return res.status(400).json({ error: 'User already exists' });
		}

		// hash the password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		// create new user
		const newUser = new User({ username, email, password: hashedPassword });
		const savedUser = await newUser.save();

		// generate and send JWT token
		const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET);
		res.header('auth-token', token).json(savedUser);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.post('/login', async (req, res) => {
	try {
		const { username, password } = req.body;

		// check if user with the given username exists
		const user = await User.findOne({ username });
		if (!user) {
			return res.status(401).json({ error: 'Invalid username or password' });
		}

		// check if password is correct
		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).json({ error: 'Invalid username or password' });
		}

		// generate and send JWT token
		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
		res.header('auth-token', token).json(user);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get('/', async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
