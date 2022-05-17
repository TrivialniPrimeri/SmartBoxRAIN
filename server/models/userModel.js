var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var userSchema = new Schema(
  {
    name: String,
    surname: String,
    phone: String,
    address: String,
    username: String,
    email: String,
    password: String,
    favouriteBoxes: [
      {
        type: Schema.Types.ObjectId,
        ref: "box",
      },
    ],
    facePaths: [
      {
        path: String,
      },
    ],
    token: {
      value: String,
      expiration: Date,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.statics.authenticate = function (username, password, callback) {
  user.findOne({ username: username }).exec(function (err, user) {
    if (err) {
      return callback(err);
    } else if (!user) {
      var err = new Error("User not found.");
      err.status = 401;
      return callback(err);
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return callback(null, user);
      } else {
        return callback(err);
      }
    });
  });
};
userSchema.pre("save", function (next) {
  var user = this;
  bcrypt.hash(user.password, 10, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  });
});
var user = mongoose.model("user", userSchema);
module.exports = user;
