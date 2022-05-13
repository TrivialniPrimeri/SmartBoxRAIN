var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });
/*
 * GET
 */
router.get('/', userController.list);
router.get('/test', userController.create)

/*
 * GET
 */
router.get('/:id', userController.show);
/*
 * POST
 */
router.post('/', userController.create);

/*
 * PUT
 */
router.put('/:id', userController.update);

/*
 * DELETE
 */
router.delete('/:id', userController.remove);


  
module.exports = router;
