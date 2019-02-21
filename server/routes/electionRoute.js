import express from 'express';
import Auth from '../Middleware/auth'
import candidate from '../controllers/electionController';

const Route = express.Router();

Route.post('/api/v1/office/:id/register', Auth.verifyToken, candidate.registerCandidate);
Route.get('/api/v1/office/:id/result', Auth.verifyToken, candidate.electionDecision);
Route.post('/api/v1/votes', Auth.verifyToken, candidate.voteACandidate);
Route.post('/api/v1/petitions', Auth.verifyToken, candidate.userPetition);

export default Route;
