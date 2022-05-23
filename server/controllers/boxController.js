var BoxModel = require('../models/boxModel.js');
const axios = require('axios');
const mongoose = require("mongoose");

/**
 * boxController.js
 *
 * @description :: Server-side logic for managing boxs.
 */
module.exports = {

    /**
     * boxController.list()
     */
    list: function (req, res) {
        BoxModel.find(function (err, boxes) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting box.',
                    error: err
                });
            }

            return res.json(boxes);
        });
    },

    /**
     * boxController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        BoxModel.findOne({_id: id}).populate('owner').populate('location').populate('authorizedUsers').exec( function (err, box) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting box.',
                    error: err
                });
            }

            if (!box) {
                return res.status(404).json({
                    message: 'No such box'
                });
            }

            return res.json(box);
        });
    },

    /**
     * boxController.create()
     */
    create: function (req, res) {
        var box = new BoxModel({
            boxId : req.body.boxId,
			owner : req.user.id,
            authorized : req.body.authorized,
			location : req.body.location,
			active : req.body.active,
			dimension : req.body.dimension,
            nickname: req.body.nickname,
        });

        box.save(function (err, box) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating box',
                    error: err
                });
            }

            return res.status(201).json(box);
        });
    },

    /**
     * boxController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        BoxModel.findOne({_id: id}, function (err, box) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting box',
                    error: err
                });
            }

            if (!box) {
                return res.status(404).json({
                    message: 'No such box'
                });
            }
            box.boxId = req.body.boxId ? req.body.boxId : box.boxId;
            box.owner = req.body.owner ? req.body.owner : box.owner;
            box.authorizedUsers = req.body.authorized ? req.body.authorized : box.authorizedUsers;
			box.location = req.body.location ? req.body.location : box.location;
			box.active = req.body.active ? req.body.active : box.active;
			box.dimension = req.body.dimension ? req.body.dimension : box.dimension;
			
            box.save(function (err, box) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating box.',
                        error: err
                    });
                }

                return res.json(box);
            });
        });
    },
    updateAuthorizedUsers: function (req, res) {
        var id = req.params.id;

        BoxModel.findOne({_id: id}, function (err, box) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting box',
                    error: err
                });
            }

            if (!box) {
                return res.status(404).json({
                    message: 'No such box'
                });
            }

            box.authorizedUsers = req.body.authorized ? req.body.authorized.map(id => mongoose.Types.ObjectId(id)) : box.authorizedUsers;


            box.save(function (err, box) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating box.',
                        error: err
                    });
                }

                return res.json(box);
            });
        });
    },

    /**
     * boxController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        BoxModel.findByIdAndRemove(id, function (err, box) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the box.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },


    unlock: function (req, res) {
        const data = { "boxId": req.params.id, "tokenFormat": 5 };
        axios.post(process.env.API_URI, data, {
            headers: {
                "Authorization": "Bearer " + process.env.API_KEY,
            }
        }
        ).then((resp) => {
            let data = resp.data;
            return res.json(data)
        }).catch((err) => {
            return res.json({errorNumber: err.response.status})
        })
    },
};
