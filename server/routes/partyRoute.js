import express from 'express';
import partyController from '../controllers/partyController';

const route = express.Router();

route.post('/api/v1/parties/', partyController.createPoliticalParty);
route.get('/api/v1/parties/', partyController.getAllPoliticalParty);
route.get('/api/v1/parties/:id', partyController.getSinglePoliticalParty);
route.patch('/api/v1/parties/:id/name', partyController.editPoliticalParty);
route.delete('/api/v1/parties/:id', partyController.deletePoliticalParty);

export default route;
