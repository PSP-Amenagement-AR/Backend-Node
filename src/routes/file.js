const express = require('express');

const fileController = require('../controllers/file');

const router = express.Router();

router.post('', fileController.create);

module.exports = router;
