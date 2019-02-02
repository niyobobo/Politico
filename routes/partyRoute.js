const express = require('express'),
    partyController = require('../controllers/partyController'),
    route = express.Router();

//Create a ​ political party​
route.post('/', partyController);

//Fetch all ​political parties​ records.
route.get('/', partyController);

//Fetch a specific political party​ record.
route.get('/:id', partyController);

//Edit the name of a specific ​ political party
route.patch('/:id/name', partyController);

//Delete a specific ​ political party
route.delete('/:id', partyController)


module.exports = route;