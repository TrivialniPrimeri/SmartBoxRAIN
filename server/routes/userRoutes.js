var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

/* GET users listing. */
/*
 * GET
 */
router.get('/', userController.list);
router.get('/test', userController.create)
router.get('/myboxes', userController.boxesList)

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
router.put('/profilephoto/:id', upload.single('image'), userController.update)

/*
 * DELETE
 */
router.delete('/:id', userController.remove);


  
module.exports = router;
