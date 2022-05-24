var express = require('express');
var router = express.Router();
var unlockController = require('../controllers/unlockController.js');

router.get('/', unlockController.list);
router.get('/:id', unlockController.show);

router.post('/', unlockController.create);

router.put('/:id', unlockController.update);

router.delete('/:id', unlockController.remove);

module.exports = router;
