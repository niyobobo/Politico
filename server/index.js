import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import partyRoute from './routes/partyRoute';
import officeRoute from './routes/officeRoute';
import userRoute from './routes/userRoute';
import candidateRoute from './routes/electionRoute';
import documentation from '../swagger.json';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(officeRoute);
app.use(partyRoute);
app.use(userRoute);
app.use(candidateRoute);

app.use('/api/v1', (req, res) => res.status(400).send({
  status: res.statusCode,
  message: 'Bad URL format. Please check your URL for error',
}));

app.use('/', swaggerUi.serve, swaggerUi.setup(documentation));

if (process.env.NODE_ENV !== 'test') app.listen(PORT);

export default app;
