const express = require('express');
const dessertsController = require('../controllers/desserts.controller');
const dessertsRoutes = express.Router();

dessertsRoutes.get('/', dessertsController.getAllDesserts);
dessertsRoutes.get('/:id', dessertsController.getDessertById);
// usersRoutes.post('/', usersController.createUser);
dessertsRoutes.patch('/:id', dessertsController.updateStock);
// usersRoutes.delete('/:id', usersController.deleteUserById);

module.exports = dessertsRoutes;
