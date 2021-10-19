const express = require('express');
const router = express.Router();
const Logger = require('../Logger');
const fsExtra = require('fs-extra')

const fs = require("fs");

const User = require('../models/user');
const Company = require('../models/company');
const Goods = require('../models/goods');

const multer  = require("multer");

let convert = require('xml-js');
let parser = require('xml2json');

const app = express();
/* [ - - - - - HTML PAGES - - - - - ] */

router.get('/index', (req, res, next) => {
	return res.render('index.ejs');
});

router.get('/about', (req, res, next) => {
	return res.render('about.ejs');
});

router.get('/blog', (req, res, next) => {
	return res.render('blog.ejs');
});

router.get('/contact', (req, res, next) => {
	return res.render('contact.ejs');
});

router.get('/buyers', (req, res, next) => {
	return res.render('buyers.ejs');
});

router.get('/suppliers', (req, res, next) => {
	return res.render('suppliers.ejs');
});

router.get('/vacancies', (req, res, next) => {
	return res.render('vacancies.ejs');
});

router.get('/basket', (req, res, next) => {
	User.findOne({ login: req.session.user_id }, (err, data) => {
		if (!data) {
			res.redirect('/login');
		} else{
			return res.render('user/basket.ejs', {
				userId: data.id,
				name: data.name,
				surname: data.surname,
				companyName: data.companyName,
				brandName: data.brandName
			});
		}
	});
});

router.get('/order', (req, res, next) => {
	User.findOne({ login: req.session.user_id }, (err, data) => {
		if (!data) {
			res.redirect('/login');
		} else{
			return res.render('user/order.ejs', {
				userId: data.id,
				name: data.name,
				surname: data.surname,
				companyName: data.companyName,
				brandName: data.brandName
			});
		}
	});
});

router.get('/balance', (req, res, next) => {
	User.findOne({ login: req.session.user_id }, (err, data) => {
		if (!data) {
			res.redirect('/login');
		} else{
			return res.render('user/balance.ejs', {
				userId: data.id,
				name: data.name,
				surname: data.surname,
				companyName: data.companyName,
				brandName: data.brandName
			});
		}
	});
});

router.get('/myGoods', (req, res, next) => {
	async function PromiseGoods(){
		let goodsObj = {
			userLogin: "",
			userIdI:  "",
			goodsId:  "",
			availableI: "",
			nameI: "",
			priceI: "",
			currencyIdI: "",
			categoryIdI: "",
			vendorI: "",
			vendorCodeI: "",
			sizeI: "",
			colorI: "",
			materialI: "",
			picturesI: ""
		};

		let goodsArray = [];
		Goods.find({ userIdI: req.session.user_id }, (err, data) => {
			if (data) {
				goodsArray.push(data);
			}
		});
		return goodsArray;
	}
	PromiseGoods().then(goodsObj => {
		User.findOne({ login: req.session.user_id }, (err, data) => {
			if (!data) {
				res.redirect('/login');
			} else{
				return res.render('user/myGoods.ejs', {
					userId: data.id,
					login: data.login,
					name: data.name,
					surname: data.surname,
					companyName: data.companyName,
					brandName: data.brandName,
					email: data.email,
					phoneNumber: data.phoneNumber,
					goods: goodsObj
				});
			}
		});
	})
});

router.get('/setsOfGoods', (req, res, next) => {
	User.findOne({ login: req.session.user_id }, (err, data) => {
		if (!data) {
			res.redirect('/login');
		} else{
			return res.render('user/setsOfGoods.ejs', {
				userId: data.id,
				name: data.name,
				surname: data.surname,
				companyName: data.companyName,
				brandName: data.brandName
			});
		}
	});
});

router.get('/allGoods', (req, res, next) => {
	async function PromiseGoods(){
		let goodsObj = {
			userLogin: "",
			userIdI:  "",
			goodsId:  "",
			availableI: "",
			nameI: "",
			priceI: "",
			currencyIdI: "",
			categoryIdI: "",
			vendorI: "",
			vendorCodeI: "",
			sizeI: "",
			colorI: "",
			materialI: "",
			picturesI: ""
		};

		let goodsArray = [];
		Goods.find({ userIdI: req.session.user_id }, (err, data) => {
			if (data) {
				goodsArray.push(data);
			}
		});
		return goodsArray;
	}
	PromiseGoods().then(goodsObj => {
		User.findOne({ login: req.session.user_id }, (err, data) => {
			if (!data) {
				res.redirect('/login');
			} else{
				return res.render('user/allGoods.ejs', {
					userId: data.id,
					login: data.login,
					name: data.name,
					surname: data.surname,
					companyName: data.companyName,
					brandName: data.brandName,
					email: data.email,
					phoneNumber: data.phoneNumber,
					goods: goodsObj
				});
			}
		});
	})
});

router.get('/suppliersUser', (req, res, next) => {
	User.findOne({ login: req.session.user_id }, (err, data) => {
		if (!data) {
			res.redirect('/login');
		} else{
			return res.render('user/suppliersUser.ejs', {
				userId: data.id,
				name: data.name,
				surname: data.surname,
				companyName: data.companyName,
				brandName: data.brandName
			});
		}
	});
});

router.get('/newsFeed', (req, res, next) => {
	User.findOne({ login: req.session.user_id }, (err, data) => {
		if (!data) {
			res.redirect('/login');
		} else{
			return res.render('user/newsFeed.ejs', {
				userId: data.id,
				name: data.name,
				surname: data.surname,
				companyName: data.companyName,
				brandName: data.brandName
			});
		}
	});
});

router.get('/goods', (req, res, next) => {
	User.findOne({ login: req.session.user_id }, (err, data) => {
		if (!data) {
			res.redirect('/login');
		} else{
			return res.render('user/goods.ejs', {
				userId: data.id,
				name: data.name,
				surname: data.surname,
				companyName: data.companyName,
				brandName: data.brandName
			});
		}
	});
});

const upload = multer({ dest: 'uploads/' })
router.post('/upload', upload.array('uploadFile', 50), function (req, res, next) {
	let jsonContent = "";
	let	newXML = "";
	async function fileChech(){
		req.files.forEach(file => {
			fs.readFile( "uploads/" + file.filename, function(err, data) {
				jsonContent = JSON.parse(parser.toJson(data));
				jsonContent.yml_catalog.shop.offers.offer.forEach(element => {
					newXML = new Goods({
						userIdI: req.session.user_id,
						goodsId: element.id,
						availableI: element.available,
						nameI: element.name,
						priceI: element.price,
						currencyIdI: element.currencyId,
						categoryIdI: element.categoryId,
						vendorI: element.vendor,
						vendorCodeI: element.vendorCode,
						sizeI: element.param[0]['$t'],
						colorI: element.param[1]['$t'],
						materialI: element.param[2]['$t'],
						/*paramI: element.param[0].name + element.param[0]['$t'],*/
						picturesI: element.picture
					})
					console.log(newXML)
					newXML.save((err, Goods) => {
						if (err) Logger.Error(Logger.Mode.REGISTER, err);
						else {
							Logger.Message(Logger.Mode.REGISTER, `Goods ${Goods.nameI} successfully registered`);

						}
					});
					}
				)
			})
		});
	}
	fileChech().then(() => {
		fsExtra.emptyDirSync('uploads')
		return res.redirect('/myGoods');
	})


})

router.get('/information', (req, res, next) => {

	async function PromiseCompany(){
		let companyObj = {
			userLogin: "",
			publicEmail: "",
			workPhoneNumber: "",
			companyAddress: "",
			city: "",
			companyName: "",
			brandName: ""
		};

		Company.findOne({ userLogin: req.session.user_id }, (err, data) => {
			if (data) {
				companyObj.userLogin = data.userLogin;
				companyObj.publicEmail = data.publicEmail;
				companyObj.workPhoneNumber = data.workPhoneNumber;
				companyObj.companyAddress = data.companyAddress;
				companyObj.city = data.city;
				companyObj.companyName = data.companyName;
				companyObj.brandName = data.brandName;
			}
		});
		return companyObj;
	}

	PromiseCompany().then(companyObj => {
		User.findOne({ login: req.session.user_id }, (err, data) => {
			if (!data) {
				res.redirect('/login');
			} else{
				return res.render('user/information.ejs', {
					userId: data.id,
					login: data.login,
					name: data.name,
					surname: data.surname,
					companyName: data.companyName,
					brandName: data.brandName,
					email: data.email,
					phoneNumber: data.phoneNumber,
					company: companyObj
				});
			}
		});
	})

});

router.post('/informationForm1', (req, res, next) => {
	let personInfo = req.body;

	console.log(personInfo);

	User.updateOne({ login : personInfo.login}, {
			$set: {
				"name" : personInfo.name,
				"surname" : personInfo.surname,
				"phoneNumber" : personInfo.phoneNumber,
				"email" : personInfo.email
			}
		},
		function(err, result){
		/*Logger.Message(Logger.Mode.FILE, "Status file (fileID) " + fileID + " set 'checked'");*/
			res.send({
				"code" : "reload"
			});
	});
});

router.post('/informationForm2', (req, res, next) => {
	let companyInfo = req.body;

	console.log(companyInfo);

	Company.find({login: companyInfo.userLogin}, (err, data) => {
			Company.updateOne({ userLogin : companyInfo.login}, {
					$set: {
						"companyName" : companyInfo.companyName,
						"brandName" : companyInfo.brandName,
						"publicEmail" : companyInfo.publicEmail,
						"workPhoneNumber" : companyInfo.workPhoneNumber,
						"companyAddress" : companyInfo.companyAddress,
						"city" : companyInfo.city
					}
				},
				function(err, result){
					/*Logger.Message(Logger.Mode.FILE, "Status file (fileID) " + fileID + " set 'checked'");*/
				});

		res.send({
			"code" : "reload"
		});
	});
});


/* [ - - - - - REGISTER - - - - - ] */

router.get('/register', (req, res, next) => {
	User.findOne({ login: req.session.user_id }, (err, data) => {
		if(data) return res.redirect('/user/' + req.session.user_id);
		else return res.render('register.ejs');
	});
});

router.post('/register', (req, res, next) => {
	let personInfo = req.body;
	User.findOne({$or: [
			{phoneNumber: personInfo.phoneNumber},
			{email: personInfo.email},
			{companyName: personInfo.companyName},
			{brandName: personInfo.brandName}
		]}, (err, data) => {
			if(data){
				if(data.phoneNumber === personInfo.phoneNumber) res.send({"Code": "101"});
				else if(data.email === personInfo.email) res.send({"Code": "102"});
				else if(data.companyName === personInfo.companyName) res.send({"Code": "103"});
				else if(data.brandName === personInfo.brandName) res.send({"Code": "104"});
				return;
			}
		let login = createLogin(personInfo.email);
		let	newPerson = new User({
			login: login,
			name: personInfo.name,
			surname: personInfo.surname,
			email: personInfo.email,
			phoneNumber: personInfo.phoneNumber,
			password: personInfo.password,
		});
		let	newCompany = new Company({
			userLogin: login,
			publicEmail: "",
			workPhoneNumber: "",
			companyAddress: "",
			city: "",
			companyName: personInfo.companyName,
			brandName: personInfo.brandName
		});
		newPerson.save((err, Person) => {
			if (err) Logger.Error(Logger.Mode.REGISTER, err);
			else {
				Logger.Message(Logger.Mode.REGISTER, `User ${Person.name} ${Person.surname} (${Person.login}) successfully registered`);
				req.session.user_id = login;
				newCompany.save((err, Company) => {
					if (err) Logger.Error(Logger.Mode.REGISTER, err);
					else {
						Logger.Message(Logger.Mode.REGISTER, `Company ${Company.companyName} successfully registered`);
						res.send({"Code": "200", "ID": Person.login});
					}
				});
			}
		});
	});
});

/* [ - - - - - LOGIN - - - - - ] */

router.get('/login', (req, res, next) => {
	User.findOne({ login: req.session.user_id }, (err, data) => {
		if (data) {
			return res.redirect('/user/' + req.session.user_id);
		}else
			return res.render('login.ejs');
	});
});

router.post('/login', (req, res, next) => {
	let personInfo = req.body;
	User.findOne({$or: [
			{phoneNumber: personInfo.login},
			{email: personInfo.login}
		]}, (err, data) => {
		if(!data){
			res.send({"Code": "100"});
		}else{
			if(data.password === personInfo.password){
				req.session.user_id = data.login;
				res.send({"Code": "200", "login": data.login});
				Logger.Message(Logger.Mode.LOGIN, `User ${data.name} ${data.surname} (${data.login}) log in account`)
			}else{
				res.send({"Code": "100"});
			}
		}
	});
});

/* [ - - - - - USER - - - - - ] */

router.get('/user/*', (req, res, next) => {
	User.findOne({ login: (req._parsedUrl.pathname).replace("/user/", "") }, (err, data) => {
		if (!data) {
			res.redirect('/login');
		} else{
			return res.render('user/basket.ejs', {
				name: data.name,
				surname: data.surname,
				companyName: data.companyName,
				brandName: data.brandName
			});
		}
	});
});

/* [ - - - - - LOGOUT - - - - - ] */

router.get('/logout', (req, res, next) => {
	if (req.session) {
		// delete session object
		req.session.destroy((err) => {
			if (err) {
				return next(err);
			} else {
				return res.redirect('/login');
			}
		});
	}
});

/* [ - - - - - FUNCTION - - - - - ] */

function createLogin(email){
	let result = "";
	for (let i = 0; i < email.length; i++) {
		if(email[i] === '@') break;
		result += email[i];
	}
	return result;
}

module.exports = router;