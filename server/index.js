import '@babel/register';
import '@babel/polyfill';
import express from 'express';
import morgan from 'morgan';
import partyRoute from './routes/partyRoute';
import officeRoute from './routes/officeRoute';
import userRoute from './routes/userRoute';
import candidateRoute from './routes/electionRoute';

const app = express();
const PORT = process.env.PORT || 3000;

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

if (process.env.NODE_ENV !== 'test') app.listen(PORT);

export default app;
