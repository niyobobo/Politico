const express = require('express'),
    partyController = require('../controllers/partyController'),
    route = express.Router();

//Create a ​ political party​
route.post('/', partyController.createPoliticalPary);

//Fetch all ​political parties​ records.
route.get('/', partyController.getAllPoliticalPary);

//Fetch a specific political party​ record.
route.get('/:id', partyController.getSinglePoliticalParty);

//Edit the name of a specific ​ political party
route.patch('/:id/name', partyController.editPoliticalPary);

//Delete a specific ​ political party
route.delete('/:id', partyController.deletePoliticalPary)

module.exports = route;