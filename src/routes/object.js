const express = require('express');

const objectController = require('../controllers/object');

const router = express.Router();

router.post('/', objectController.create);
router.delete('/:id', objectController.delete);
router.get('/', objectController.get);

module.exports = router;
