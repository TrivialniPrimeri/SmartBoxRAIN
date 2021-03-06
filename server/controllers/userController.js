const boxModel = require("../models/boxModel.js");
const BoxModel = require("../models/boxModel.js");
const unlockModel = require("../models/unlockModel.js");
var UserModel = require("../models/userModel.js");
const fs = require('fs')

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
    UserModel.find({},'_id name surname email phone').exec(function (err, users) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      return res.json(users);
    });
  },

  listAll: function (req, res) {

    if(!req.user?.isAdmin) return res.sendStatus(403);

    UserModel.find({}).lean().exec(async function (err, users) {

      if (err) {
        return res.status(500).json({
          message: "Error when getting user.",
          error: err,
        });
      }

      if(!users) return res.json([]);
      for(const user of users) {
        const count = await boxModel.count({owner: user._id});
        user.boxCount = count;

        const lastUnlock = await unlockModel.find({userId: user._id}).sort({createdAt: -1}).limit(1);
        if(lastUnlock.length > 0) {
          user.lastUnlock = lastUnlock[0].createdAt;
        }

      }

      return res.json(users);

    });
  },

  boxesList: function (req, res) {
    BoxModel.find({owner: req.user.id, active: true}).exec(function (err, boxes) {
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

    if(id != req.user.id && !req.user.isAdmin){
      return res.sendStatus(403);
    }

    UserModel.findOne({ _id: id }).lean().exec(async function (err, user) {
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

      const count = await boxModel.count({owner: user._id});
      user.boxCount = count;

      const authorizedCount = await boxModel.count({authorizedUsers: user._id});
      user.authorizedCount = authorizedCount;
      
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

    if(id != req.user.id && !req.user.isAdmin){
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

      if(req.file && user.imgPath != ""){
        try{
          fs.unlinkSync(`public/${user.imgPath}`);
        } catch(err){
          console.log('No image found ... probably a server wipe.');
        }
      }

      user.name = req.body.name ? req.body.name : user.name;
      user.surname = req.body.surname ? req.body.surname : user.surname;
      user.phone = req.body.phone ? req.body.phone : user.phone;
      user.isAdmin = (req.body.isAdmin != undefined) ? req.body.isAdmin : user.isAdmin;
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

    if(id != req.user.id && !req.user.isAdmin){
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

  allUnlocks: function (req, res) {

    if(!req.user?.isAdmin && req.user?.id != req.params.id) return res.sendStatus(403);

    unlockModel.find({userId: req.params.id}, 'boxId success createdAt').populate("boxId").exec(function (err, boxes) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting box.',
                error: err
            });
        }

        return res.json(boxes);
    });
  },
};
