const router = require('express').Router();
const auth = require('./auth');
const todo = require('./todo');

router.use('/v1/auth', auth);
router.use('/v1/todo', todo);

module.exports = router;
