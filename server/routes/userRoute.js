import express from 'express';
import userController from '../controllers/userController';

const route = express.Router();

route.post('/auth/signup', userController.userCreateAccount);
route.post('/auth/login', userController.userLogin);
route.post('/auth/reset', userController.userResetPassword);

export default route;
