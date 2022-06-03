var UnlockModel = require('../models/unlockModel.js');

/**
 * unlockController.js
 *
 * @description :: Server-side logic for managing unlocks.
 */
module.exports = {

    /**
     * unlockController.list()
     */
    list: function (req, res) {
        UnlockModel.find({}).populate("boxId").function (err, unlocks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting unlock.',
                    error: err
                });
            }

            return res.json(unlocks);
        });
    },

    /**
     * unlockController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UnlockModel.findOne({_id: id}, function (err, unlock) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting unlock.',
                    error: err
                });
            }

            if (!unlock) {
                return res.status(404).json({
                    message: 'No such unlock'
                });
            }

            return res.json(unlock);
        });
    },

    /**
     * unlockController.create()
     */
    create: async function (req, res) {

        let boxId = req.body.boxId;

        let boxObj = await BoxModel.findOne({boxId: boxId});

        var unlock = new UnlockModel({
			userId : req.body.userId,
			success : req.body.success,
			boxId : boxObj._id
        });

        unlock.save(function (err, unlock) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating unlock',
                    error: err
                });
            }

            return res.status(201).json(unlock);
        });
    },

    /**
     * unlockController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UnlockModel.findOne({_id: id}, function (err, unlock) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting unlock',
                    error: err
                });
            }

            if (!unlock) {
                return res.status(404).json({
                    message: 'No such unlock'
                });
            }

            unlock.userId = req.body.userId ? req.body.userId : unlock.userId;
			unlock.success = req.body.success ? req.body.success : unlock.success;
			unlock.boxId = req.body.boxId ? req.body.boxId : unlock.boxId;
			
            unlock.save(function (err, unlock) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating unlock.',
                        error: err
                    });
                }

                return res.json(unlock);
            });
        });
    },

    /**
     * unlockController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UnlockModel.findByIdAndRemove(id, function (err, unlock) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the unlock.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
