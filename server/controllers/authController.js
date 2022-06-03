var UserModel = require("../models/userModel.js");
var UserController = require("../controllers/userController.js");
const jwt = require("jsonwebtoken");

function generateAccToken(user){
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" }); //30mins cca
}

module.exports = {

	login: function (req, res) {
		UserModel.authenticate(req.body.email, req.body.password, function(error, user){
			if(error || !user){
				res.status(500).json({success: false, message: "Wrong username or password"});
			} else{
				const userObj = { email: user.email, id: user._id, isAdmin: user.isAdmin};
				const accessToken = generateAccToken(userObj);
				const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "200d" });
				res
				.cookie('refreshToken', refreshToken, {maxAge: 17_280_000_000, httpOnly: true, path: '/auth/refresh' })
				.cookie('accessToken', accessToken, {maxAge: 25_000, httpOnly: true, path: '/' })
				.json({success: true, message: "Successfully logged in", accessToken: accessToken});
			}
		 });
    },
	
	register: function (req, res) {
		UserController.create(req, res);
    },

	refresh: function (req, res) {
		const refreshToken = req.cookies.refreshToken;
		if(refreshToken == null) return res.sendStatus(401);

		jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => { //no blacklist so far

			if (err) return res.sendStatus(401); //invalid

			UserModel.findById(user.id, function(err, mongoUser){

				if(!mongoUser || err) return res.sendStatus(403);

				const accessToken = generateAccToken({email: mongoUser.email, id: mongoUser._id, isAdmin: mongoUser.isAdmin});
				res
				.cookie('accessToken', accessToken, {maxAge: 25_000, httpOnly: true, path: '/' })
				.json({accessToken: accessToken});

			});
			return;


		});

    },

	logout: function (req, res) {
		res.clearCookie('accessToken').clearCookie('refreshToken').sendStatus(200);
	},

	facelogin: function (req, res) {
		console.log(req.body);
		res.sendStatus(200);
    },
}