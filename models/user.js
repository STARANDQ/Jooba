const mongoose = require('mongoose');
const Schema = mongoose.Schema;

userSchema = new Schema( {
	login: String,
	name: String,
	surname: String,
	email: String,
	phoneNumber: String,
	role: {
		type: String,
		default: "user"
	},
	password: String,
	webSite: {
		type: String,
		default: ""
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});
User = mongoose.model('User', userSchema);

module.exports = User;