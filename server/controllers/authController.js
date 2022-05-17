var UserModel = require("../models/userModel.js");
var UserController = require("../controllers/userController.js");
const jwt = require("jsonwebtoken");

module.exports = {

	login: function (req, res) {
		UserModel.authenticate(req.body.email, req.body.password, function(error, user){
			if(error || !user){
				res.status(500).json({success: false, message: "Wrong username or password"});
			} else{
				const userObj = { email: user.email };
				const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET);
				res.json({success: true, message: "Successfully logged in", token: accessToken});
			}
		 });
    },
	
	register: function (req, res) {
		UserController.create(req, res);
    },

}