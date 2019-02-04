const express = require('express'),
    officeController = require('../controllers/officeController'),
    route = express.Router();

//Create a ​ political office
route.post('/', officeController.createPoliticalOffice);

//Fetch all ​ political offices records.
route.get('/', officeController.getAllPoliticalOffices);

//Fetch a specific political office record.
route.get('/:id', officeController.getSpecificPoliticalOffice);


module.exports = route;