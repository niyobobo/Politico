const express = require('express');
const officeController = require('../controllers/officeController');

const route = express.Router();

// Create political office record.
route.post('/', officeController.createPoliticalOffice);

// Fetch a political office record.
route.get('/', officeController.getAllPoliticalOffices);

// Fetch a specific political office record.
route.get('/:id', officeController.getSpecificPoliticalOffice);

module.exports = route;
