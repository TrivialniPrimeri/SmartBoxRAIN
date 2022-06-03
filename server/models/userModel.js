var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt");
var userSchema = new Schema(
  {
    name: String,
    surname: String,
    phone: String,
    address: String,
    email: String,
    password: String,
    imgPath: {
      type: String,
      default: ""
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
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
    faceIndex: String
  },
  {
    timestamps: true,
  }
);

userSchema.statics.authenticate = function (email, password, callback) {
  user.findOne({ email: email }).exec(function (err, user) {
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
  if (!user.isModified('password')) return next(); // prevents rehashing
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
