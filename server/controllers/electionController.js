import joi from 'joi';
import moment from 'moment';
import queries from '../database/queries';
import executor from '../database/queryExecutor';

const candidate = {

    async registerCandidate (req, res) {
        const { userId, partyId } = req.body;
        const { isAdmin } = req.user;
        const officeId  = req.params.id;

        if(!isAdmin){
            return res.status(401).send({
              status: res.statusCode,
              error: 'Unauthorized, Only Admin can access this end-point',
            });
          }

        if (!Number(officeId)) {
            return res.status(400).send({
              status: res.statusCode,
              error: 'Office Id should be an integer',
            });
        }

        const schema= joi.object().keys({
            userId: joi.number().required(),
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
            if(response.rowCount===1){
                return res.status(200).send({
                    status: res.statusCode,
                    data: response.rows
                });
            }else{
                return res.status(400).send({
                    status: res.statusCode,
                    data: response.detail
                });
            }

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
            if(response.rowCount===1){
                return res.status(200).send({
                    status: res.statusCode,
                    data: response.rows
                });
            }else{
                return res.status(400).send({
                    status: res.statusCode,
                    error: 'You are not allowed to vote twice'
                });
            }

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
    },

    async userPetition(req, res){
        const { office, body, evidence } = req.body;
        const { id } = req.user;
        const schema= joi.object().keys({
            office: joi.number().required(),
            body: joi.string().trim().required(),
            evidence: joi.string().trim().required()
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
            const petition = [id, office, body, evidence, moment(new Date())];
            const response = await executor.query(queries.makePetition, petition);
            if(response.rowCount===1){

                const { id, createdby, office, body, evidence, createdon} = response.rows[0];
                const evidenceArray = evidence.split(',');

                return res.status(200).send({
                    status: res.statusCode,
                    data: [{id, createdby, office, body, evidence:evidenceArray, createdon}],
                });
            }else{
                return res.status(400).send({
                    status: res.statusCode,
                    error: 'You have already created a petition to this office'
                });
            }

        } catch (error) {
            return res.status(400).send({
                status: res.statusCode,
                error: error.detail
            });
        }
    }
};

export default candidate;
