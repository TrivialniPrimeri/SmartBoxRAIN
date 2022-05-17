var express = require('express');
var router = express.Router();
var boxController = require('../controllers/boxController.js');

/*
 * GET
 */
router.get('/', boxController.list);

/*
 * GET
 */
router.get('/:id', boxController.show);

/*
 * POST
 */
router.post('/', boxController.create);

/*
 * PUT
 */
router.put('/:id', boxController.update);

/*
 * DELETE
 */
router.delete('/:id', boxController.remove);

module.exports = router;
