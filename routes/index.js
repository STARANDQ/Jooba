const express = require('express');
const router = express.Router();
const Logger = require('../Logger');

const User = require('../models/user');

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

router.get('/suppliers', (req, res, next) => {
	return res.render('suppliers.ejs');
});

router.get('/vacancies', (req, res, next) => {
	return res.render('vacancies.ejs');
});

router.get('/TEST', (req, res, next) => {
	return res.render('TEST.ejs');
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
			companyName: personInfo.companyName,
			brandName: personInfo.brandName
		});
		newPerson.save((err, Person) => {
			if (err) Logger.Error(Logger.Mode.REGISTER, err);
			else {
				Logger.Message(Logger.Mode.REGISTER, `User ${Person.name} ${Person.surname} (${Person.login}) successfully registered`);
				req.session.user_id = login;
				res.send({"Code": "200", "ID": Person.login});
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
			return res.render('user.ejs', {
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