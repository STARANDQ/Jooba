const mongoose = require('mongoose');
const Schema = mongoose.Schema;

goodsSchema = new Schema( {
	userIdI: String,
	goodsId: String,
	availableI: String,
	nameI: String,
	priceI: String,
	currencyIdI: String,
	categoryIdI: String,
	vendorI: String,
	vendorCodeI: String,
	sizeI: String,
	colorI: String,
	materialI: String,
	picturesI: Array
});
Goods = mongoose.model('Goods', goodsSchema);

module.exports = Goods;