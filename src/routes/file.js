const express = require('express');

const fileController = require('../controllers/file');

const router = express.Router();

router.post('', fileController.create);
router.put('', fileController.update);
router.delete('', fileController.delete);

module.exports = router;
