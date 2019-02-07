const express = require('express');
const partyController = require('../controllers/partyController');

const route = express.Router();

route.post('/', partyController.createPoliticalPary);
route.get('/', partyController.getAllPoliticalPary);
route.get('/:id', partyController.getSinglePoliticalParty);
route.patch('/:id/name', partyController.editPoliticalPary);
route.delete('/:id', partyController.deletePoliticalPary);

module.exports = route;
