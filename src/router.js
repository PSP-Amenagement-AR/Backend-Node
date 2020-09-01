const express = require('express');
const swaggerRouter = require('./routes/swagger');
const userRouter = require('./routes/user');

const router = express.Router();

router.use('/users', userRouter);
router.use(swaggerRouter);

module.exports = router;
