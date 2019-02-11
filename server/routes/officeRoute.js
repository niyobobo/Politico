import express from 'express';
import officeController from '../controllers/officeController';

const route = express.Router();

route.post('/api/v1/offices/', officeController.createPoliticalOffice);
route.get('/api/v1/offices/', officeController.getAllPoliticalOffices);
route.get('/api/v1/offices/:id', officeController.getSpecificPoliticalOffice);

export default route;
