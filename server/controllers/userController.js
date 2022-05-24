const BoxModel = require("../models/boxModel.js");
var UserModel = require("../models/userModel.js");

/**
 * userController.js
 *
 * @description :: Server-side logic for managing users.
 */
module.exports = {
  /**
   * userController.list()
   */
  list: function (req, res) {
    UserModel.find({},'_id name surname email').exec(function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      return res.json(users);
    });
  },

  boxesList: function (req, res) {
    BoxModel.find({owner: req.user.id}).exec(function (err, boxes) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      BoxModel.find({authorizedUsers: req.user.id}).exec(function (err, authorizedBoxes) {
        return res.json({boxes: boxes, authorizedBoxes: authorizedBoxes});
      })

    });
  },

  /**
   * userController.show()
   */
  show: function (req, res) {
    var id = req.params.id;

    if(id != req.user.id && !req.user.admin){
      return res.sendStatus(403);
    }

    UserModel.findOne({ _id: id }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }

      return res.json(user);
    });
  },

  /**
   * userController.create()
   */
  create: function (req, res) {
    var user = new UserModel({
      name: req.body.firstName,
      surname: req.body.lastName,
      phone: req.body.phone ? req.body.phone : null,
      address: req.body.address ? req.body.address : null,
      email: req.body.email,
      password: req.body.password,
    });

    user.save(function (err, user) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          message: "Error when creating user",
          error: err,
        });
      }

      return res.status(201).json(user);
    });
  },

  /**
   * userController.update()
   */
  update: function (req, res) {

    var id = req.params.id;

    if(id != req.user.id && !req.user.admin){
      return res.sendStatus(403);
    }

    UserModel.findOne({ _id: id }, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user",
          error: err,
        });
      }

      if (!user) {
        return res.status(404).json({
          message: "No such user",
        });
      }
      user.name = req.body.name ? req.body.name : user.name;
      user.surname = req.body.surname ? req.body.surname : user.surname;
      user.phone = req.body.phone ? req.body.phone : user.phone;
      user.address = req.body.address ? req.body.address : user.address;
      user.email = req.body.email ? req.body.email : user.email;
      user.password = req.body.password ? req.body.password : user.password;
      user.imgPath = req.file ? "/images/"+req.file.filename : user.imgPath;

      user.save(function (err, user) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating user.",
            error: err,
          });
        }

        return res.json(user);
      });
    });
  },

  /**
   * userController.remove()
   */
  remove: function (req, res) {
    var id = req.params.id;

    if(id != req.user.id && !req.user.admin){
      return res.sendStatus(403);
    }

    UserModel.findByIdAndRemove(id, function (err, user) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the user.",
          error: err,
        });
      }

      return res.status(204).json();
    });
  },
};
