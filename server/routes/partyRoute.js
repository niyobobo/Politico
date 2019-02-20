import express from 'express';
import auth from '../Middleware/auth'
import party from '../controllers/partyController';

const route = express.Router();

route.post('/api/v1/parties/', auth.verifyToken, party.createPoliticalParty);
route.get('/api/v1/parties/', auth.verifyToken, party.getAllPoliticalParty);
route.get('/api/v1/parties/:id', auth.verifyToken, party.getSinglePoliticalParty);
route.patch('/api/v1/parties/:id/name', auth.verifyToken, party.editPoliticalParty);
route.delete('/api/v1/parties/:id', auth.verifyToken, party.deletePoliticalParty);

export default route;
