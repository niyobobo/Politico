import express from 'express';
import partyController from '../controllers/partyController';

const route = express.Router();

route.post('/api/v1/parties/', partyController.createPoliticalPary);
route.get('/api/v1/parties/', partyController.getAllPoliticalPary);
route.get('/api/v1/parties/:id', partyController.getSinglePoliticalParty);
route.patch('/api/v1/parties/:id/name', partyController.editPoliticalPary);
route.delete('/api/v1/parties/:id', partyController.deletePoliticalPary);

export default route;
