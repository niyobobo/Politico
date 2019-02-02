const express = require('express'),
    officeController = require('../controllers/officeController'),
    route = express.Router();

//Create a ​ political office
route.post('/', officeController);

//Fetch all ​ political offices records.
route.get('/', officeController);

//Fetch a specific political office record.
route.get('/:id', officeController);


module.exports = route;