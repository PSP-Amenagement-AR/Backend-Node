const express = require('express');
const userController = require('../controllers/user');

const checkToken = require('../middlewares/check-token');
const decodeToken = require('../middlewares/decode-token');
const admin = require('../middlewares/admin');

const router = express.Router();

router.post('/register', userController.create);
router.post('/login', userController.login);
router.get('/disconnect', decodeToken, checkToken, userController.disconnect);
router.put('/', decodeToken, checkToken, userController.update);
router.put('/:id', decodeToken, checkToken, admin, userController.adminUpdate);
router.delete('/:id', decodeToken, checkToken, userController.delete);

module.exports = router;
