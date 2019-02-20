import express from 'express';
import auth from '../Middleware/auth'
import office from '../controllers/officeController';

const route = express.Router();

route.post('/api/v1/offices/', auth.verifyToken, office.createPoliticalOffice);
route.get('/api/v1/offices/', auth.verifyToken, office.getAllPoliticalOffices);
route.get('/api/v1/offices/:id', auth.verifyToken, office.getSpecificPoliticalOffice);

export default route;
