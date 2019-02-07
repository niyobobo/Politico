const express = require('express');
const officeController = require('../controllers/officeController');

const route = express.Router();

route.post('/', officeController.createPoliticalOffice);
route.get('/', officeController.getAllPoliticalOffices);
route.get('/:id', officeController.getSpecificPoliticalOffice);

module.exports = route;
