const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		minlength: 3,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlength: 6,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		lowercase: true,
		validate: {
			validator: (value) => {
				return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
			},
			message: 'Please enter a valid email address',
		},
	},
});

const User = mongoose.model('User', userSchema);

module.exports = User;
