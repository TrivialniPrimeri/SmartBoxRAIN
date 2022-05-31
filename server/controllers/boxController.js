var BoxModel = require('../models/boxModel.js');
const axios = require('axios');
const mongoose = require("mongoose");
const unlockModel = require('../models/unlockModel.js');
const boxModel = require('../models/boxModel.js');

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

        if(!req.user?.isAdmin && req.user) return res.sendStatus(403);

        BoxModel.find().populate('owner').exec(function (err, boxes) {
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

        BoxModel.findOne({_id: id}).populate('owner').populate('location').populate('authorizedUsers').lean().exec( async function (err, box) {
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

            const latestUnlock = await unlockModel.find({boxId: box._id}).populate("userId").sort({createdAt: -1}).limit(1);
            box.latestUnlock = latestUnlock[0];

            return res.json(box);
        });
    },

    /**
     * boxController.create()
     */
    create: function (req, res) {

        var box = new BoxModel({
            boxId : req.body.boxId,
			owner : req.user?.id,
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
			box.active = req.body.active != undefined ? req.body.active : box.active;
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


    unlock: async function (req, res) {

        let boxId = req.params.id;
        let userId = req.user?.id;

        //lahko se doda overwrite za admina - zaenkrat ni
        if(await boxModel.count({boxId: boxId, owner: userId}) == 0 && await boxModel.count({boxId: boxId, authorizedUsers: userId}) == 0) return res.sendStatus(403);

        const data = { "boxId": boxId, "tokenFormat": 5 };
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

    allUnlocks: function (req, res) {

        boxModel.findById(req.params.id).exec(function (err, box) {
            if(err) return res.sendStatus(500);
            
            if(req.user?.id != box.owner && !req.user?.isAdmin && req.user) return res.sendStatus(403);

            unlockModel.find({boxId: req.params.id}).populate("userId").exec(function (err, unlocks) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting unlocks.',
                        error: err
                    });
                }
    
                return res.json(unlocks);
            });

        });

    },
};
