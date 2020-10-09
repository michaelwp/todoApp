const todoRouter = require('express').Router();
const { todo } = require('../controller');
const { security } = require('../../../middleware');

// check token
todoRouter.use(security.checkToken);

todoRouter.post('', todo.create);
todoRouter.get('/user', todo.user);
todoRouter.get('/:id', todo.view);
todoRouter.put('/:id', todo.update);
todoRouter.delete('/:id', todo.remove);

module.exports = todoRouter;
