const express = require('express');
const dessertsController = require('../controllers/desserts.controller');
const dessertsRoutes = express.Router();

dessertsRoutes.get('/', dessertsController.getAllDesserts);
// usersRoutes.get('/:id', usersController.getUserById);
// usersRoutes.post('/', usersController.createUser);
// usersRoutes.patch('/:id', usersController.updateUser);
// usersRoutes.delete('/:id', usersController.deleteUserById);

module.exports = dessertsRoutes;
