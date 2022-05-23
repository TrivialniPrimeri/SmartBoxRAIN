var express = require('express');
var router = express.Router();
var boxController = require('../controllers/boxController.js');

router.get('/', boxController.list);

router.get('/:id', boxController.show);

router.get('/unlock/:id', boxController.unlock);

router.post('/', boxController.create);

router.put('/:id', boxController.update);

router.put('/:id/authorize',boxController.updateAuthorizedUsers)

router.delete('/:id', boxController.remove);

router.get('/:id/unlocks', boxController.allUnlocks);

module.exports = router;