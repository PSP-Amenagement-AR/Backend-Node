const express = require('express');

const fileUpload = require('express-fileupload');
const decodeToken = require('./middlewares/decode-token');
const checkToken = require('./middlewares/check-token');

const swaggerRouter = require('./routes/swagger');
const userRouter = require('./routes/user');
const fileRouter = require('./routes/file');
const objectRouter = require('./routes/object');

const router = express.Router();

router.use('/users', userRouter);
router.use('/files', fileUpload({ createParentPath: true }), decodeToken, checkToken, fileRouter);
router.use('/objects', decodeToken, checkToken, objectRouter);
router.use(swaggerRouter);

module.exports = router;
