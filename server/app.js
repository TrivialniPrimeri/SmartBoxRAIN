var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors')
var logger = require('morgan');
var mongoose = require('mongoose')
require('dotenv').config()
const jwt = require("jsonwebtoken");

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'))

var usersRouter = require("./routes/userRoutes");
var testApiRouter = require("./routes/testApi");
var boxesRouter = require("./routes/boxRoutes");
var unlocksRouter = require("./routes/unlockRoutes");
var authRouter = require("./routes/authRoutes");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const allowedOrigins = ['http://localhost', 'http://localhost:81'];
app.use(cors({
	credentials: true,
	origin(origin, callback) {
	// Allow requests with no origin (mobile apps, curl)
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) === -1) {
			const msg = 'The CORS policy does not allow access from the specified Origin.';
			return callback(new Error(msg), false);
		}
		return callback(null, true);
	},
})); //	default allow *

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function checkAuth(req, res, next){
  const header = req.headers['authorization']; //Bearer <token>
  const token = header && header.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; //saves user data!
    next();
  });
}
app.use('/auth', authRouter);
app.use('/users', checkAuth, usersRouter);
app.use('/testAPI', checkAuth, testApiRouter);
app.use('/box', boxesRouter);
app.use('/unlocks', checkAuth, unlocksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json(err);
});

module.exports = app;
