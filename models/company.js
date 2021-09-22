const mongoose = require('mongoose');
const Schema = mongoose.Schema;

companySchema = new Schema( {
	userLogin: String,
	publicEmail: String,
	workPhoneNumber: String,
	companyName: String,
	brandName: String,
	companyAddress: String,
	city: String,
	createdAt: {
		type: Date,
		default: Date.now
	}
});
Company = mongoose.model('Company', companySchema);

module.exports = Company;