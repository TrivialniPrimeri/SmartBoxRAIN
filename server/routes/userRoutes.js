var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController.js');
var multer = require('multer');
var upload = multer({dest: 'public/images/'});

router.get('/', userController.list);
router.get('/all', userController.listAll);
router.get('/myboxes', userController.boxesList)
router.get('/:id/unlocks', userController.allUnlocks);

router.get('/:id', userController.show);

router.post('/', userController.create);

router.put('/:id', userController.update);
router.put('/profilephoto/:id', upload.single('image'), userController.update)

router.delete('/:id', userController.remove);

module.exports = router;