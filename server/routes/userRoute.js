import express from 'express';
import userController from '../controllers/userController';

const route = express.Router();

route.post('/api/v1/auth/signup', userController.userCreateAccount);
route.post('/api/v1/auth/login', userController.userLogin);

export default route;
