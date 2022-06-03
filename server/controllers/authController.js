var UserModel = require("../models/userModel.js");
var UserController = require("../controllers/userController.js");
const jwt = require("jsonwebtoken");
const fs =  require('fs');
const path = require("path");

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
		let base64 = req.body.loginImage;
		if(base64){
			try{
				fs.writeFileSync("python/face.png", base64, "base64");
			} catch(e){
				return res.sendStatus(500);
			}

			const spawn = require("child_process").spawn;

			var scriptPath = path.resolve(__dirname + '/../python/');
			const pyLogin = spawn('python3',['detect.py'], {
				cwd: scriptPath
			});
			pyLogin.stdout.on('data',async function(data){

				let userIndex = data.toString().replace(/[\n\r]/g, "");

				let user = await UserModel.findOne({faceIndex: userIndex}).exec();

				const userObj = { email: user.email, id: user._id, isAdmin: user.isAdmin};
				const accessToken = generateAccToken(userObj);
				const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "200d" });
				return res
				.cookie('refreshToken', refreshToken, {maxAge: 17_280_000_000, httpOnly: true, path: '/auth/refresh' })
				.cookie('accessToken', accessToken, {maxAge: 25_000, httpOnly: true, path: '/' })
				.json({success: true, message: "Successfully logged in", accessToken: accessToken, name: user.name});

			});


			 



			 
		}
		else{
			return res.sendStatus(403);
		}
    },
}