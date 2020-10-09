const authRouter = require('express').Router();
const { auth } = require('../controller');

authRouter.post('/register', auth.register);
authRouter.post('/login', auth.login);

module.exports = authRouter;
