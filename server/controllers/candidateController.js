import joi from 'joi';
import moment from 'moment';
import queries from '../database/queries';
import executor from '../database/queryExecutor';

const candidate = {

    async registerCandidate (req, res) {
        const { userId, officeId, partyId } = req.body;
        const { id } = req.user;

        try {
            const { rows } = await executor.query(queries.getUserById, [id]);
            if(!rows[0].isadmin){
                return res.status(401).send({
                    status: res.statusCode,
                    error: 'Unauthorized',
                });
            }
        } catch (error) {
            return res.status(400).send({
                status: res.statusCode,
                error: error
            });
        }

        const schema= joi.object().keys({
            userId: joi.number().required(),
            officeId: joi.number().required(),
            partyId: joi.number().required()
        });
        const validation = joi.validate(req.body, schema, ({ abortEarly : false}));
        if (validation.error != null) {
            const errors = [];
            for (let index = 0; index < validation.error.details.length; index++) {
                errors.push(validation.error.details[index].message.split('"').join(''));
            }

            return res.status(400).send({
                status: res.statusCode,
                error: errors,
            });
        }

        try {            
            const candidate = [officeId, partyId, userId];
            const response = await executor.query(queries.registerCandidate, candidate);
            return res.status(200).send({
                status: res.statusCode,
                data: response.rows
            });

        } catch (error) {
            return res.status(400).send({
                status: res.statusCode,
                error: error.detail
            });
        }
    },

    async voteACandidate(req, res){
        const { officeId, candidateId } = req.body;
        const { id } = req.user;

        const schema= joi.object().keys({
            officeId: joi.number().required(),
            candidateId: joi.number().required()
        });
        const validation = joi.validate(req.body, schema, ({ abortEarly : false}));
        if (validation.error != null) {
            const errors = [];
            for (let index = 0; index < validation.error.details.length; index++) {
                errors.push(validation.error.details[index].message.split('"').join(''));
            }
            return res.status(400).send({
                status: res.statusCode,
                error: errors,
            });
        }

        try {            
            const candidate = [id, officeId, candidateId, moment(new Date())];
            const response = await executor.query(queries.makeVote, candidate);
            return res.status(200).send({
                status: res.statusCode,
                data: response.rows
            });

        } catch (error) {
            return res.status(400).send({
                status: res.statusCode,
                error: error.detail
            });
        }
    },

    async electionDecision(req, res){
        const { id } = req.params;

        if (!Number(id)) {
            return res.status(400).send({
                status: res.statusCode,
                error: 'ID should be an Integer value',
            });
        }

        try {  
            const { rows } = await executor.query(queries.voteDecision, [id]);
            return res.status(200).send({
                status: res.statusCode,
                data: rows
            });
        } catch (error) {
            return res.status(400).send({
                status: res.statusCode,
                error: error
            });
        }
    }
};

export default candidate;
