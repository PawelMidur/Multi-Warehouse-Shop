var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.json({
		success: true, 
		msg: "This Is API Stytem..."
	});
});

router.post('/login', function(req, res, next) {
	res.json({
		success: true,
		message: 'Enjoy your token!'
	});
});
/*router.post('/login', function(req, res, next) {

	var name = req.body.name;
	var pass = req.body.password;

	Login.getLogin(name, pass, function (error, results, fields) {
		if (error){
			var err = new Error("MySQL resquest error");
			err.status = 500;
			err.error = error;
			next(err);
		}

		if (results[0]){
			var token = jwt.sign(results[0], process.env.SecretKey, {
			 	expiresIn: "8h"
			});

			res.json({
				success: true,
				message: 'Enjoy your token!',
				token: token
			});
		} else {
			res.json({
				success: false,
				message: 'No User'
			});
		}
	});

}); */

router.post('/login/check', function(req, res, next) {
	res.json({
		success: true,
		message: 'Token valid!'
	});
});
/*router.post('/login/check', function(req, res, next) {

	var token = req.body.token;

	if (token) 
	{
		jwt.verify(token, process.env.SecretKey, function(error, decoded) {      
			if (error) {
				console.log(error);
				res.json({
					success: false,
					message: 'Token invalid!.',
					error: error
				});
			} 
			else {
				res.json({
					success: true,
					message: 'Token valid!'
				});
	/*		}
		});
	}
	else {
		res.json({
			success: false,
			message: 'Token invalid!.'
		});
	}

});*/

module.exports = router;
