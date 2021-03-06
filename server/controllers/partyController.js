import joi from 'joi';
import moment from 'moment';
import queries from '../database/queries';
import executor from '../database/queryExecutor';

const politicalParty = {

  async createPoliticalParty(req, res) {
    const {
      name,
      hqAddress,
      logoUrl,
      representative,
      contact,
      website,
    } = req.body;
    const { isAdmin } = req.user;    

    if(!isAdmin){
      return res.status(401).send({
        status: res.statusCode,
        error: 'Unauthorized, Only Admin can access this end-point',
      });
    }

    const schema = joi.object().keys({
      name: joi.string().trim().max(50).required(),
      hqAddress: joi.string().trim().max(50).required(),
      logoUrl: joi.string().trim().max(500).required(),
      representative: joi.string().trim().max(50).required(),
      contact: joi.string().regex(/^(07)(\d{8})/).length(10).required(),
      website: joi.string().trim().max(50).required(),
    });

    const validation = joi.validate(req.body, schema, {
      abortEarly: false,
    });

    if (validation.error != null) {
      const errors = [];
      for (let i = 0; i < validation.error.details.length; i++) {
        errors.push(validation.error.details[i].message.split('"').join(''));
      }
      return res.status(400).send({
        status: res.statusCode,
        error: errors,
      });
    }

    const party = [
      name,
      hqAddress,
      logoUrl,
      representative,
      contact,
      website,
      moment(new Date()),
    ];

    const { rowCount } = await executor.query(queries.checkIfExist, [contact]);
    if (rowCount !== 0) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'This party is already registered',
      });
    }

    try {
      const result = await executor.query(queries.createParty, party);
      if (result.rowCount === 1) {
        return res.status(201).send({
          status: res.statusCode,
          data: result.rows,
        });
      }
    } catch (e) {
      return res.status(400).send({
        status: res.statusCode,
        error: e
      });
    }
  },

  async getAllPoliticalParty(req, res){
    try {
      const { rows } = await executor.query(queries.getAllParty);
      return res.status(200).send({
        status: res.statusCode,
        data: rows,       
      });
    } catch (err) {
      return res.status(500).send({
        status: res.statusCode,
        data: err,
      });
    }
  },

  async getSinglePoliticalParty(req, res){
    const { id } = req.params;

    if (!parseInt(id)) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'ID should be an Integer value',
      });
    }

    try {
      const { rowCount, rows } = await executor.query(queries.getSingleParty, [id]);
      if (rowCount === 0) {
        return res.status(404).send({
          status: res.statusCode,
          error: 'Party not found',
        });
      }
      return res.status(200).send({
        status: res.statusCode,
        data: rows,
      });
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        data: error,
      });
    }
  },

  async editPoliticalParty(req, res){
    const { id } = req.params;
    const { name } = req.body;
    const { isAdmin } = req.user;    

    if(!isAdmin){
      return res.status(401).send({
        status: res.statusCode,
        error: 'Unauthorized, Only Admin can access this end-point',
      });
    }
    
    if (!parseInt(id)) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'ID should be an Integer value',
      });
    }

    const schema = joi.object().keys({
      name: joi.string().min(3).max(50).required(),
    });
    const validation = joi.validate(req.body, schema, {
      abortEarly: false,
    });

    if (validation.error != null) {
      const errors = [];
      for (let i = 0; i < validation.error.details.length; i++) {
        errors.push(validation.error.details[i].message.split('"').join(''));
      }
      return res.status(400).send({
        status: res.statusCode,
        error: errors,
      });
    }

    try {
      const { rowCount } = await executor.query(queries.getSingleParty, [id]);
      if (rowCount === 0) {
        return res.status(404).send({
          status: res.statusCode,
          error: 'Party you are trying to UPDATE is not exist',
        });
      }
      const { rows } = await executor.query(queries.updateParty, [id, name]);
      return res.status(200).send({
        status: res.statusCode,
        data: rows,
      });
    } catch (err) {
      return res.status(500).send({
        status: res.statusCode,
        data: err,
      });
    }
  },

  async deletePoliticalParty(req, res){
    const { id } = req.params;
    const { isAdmin } = req.user;    

    if(!isAdmin){
      return res.status(401).send({
        status: res.statusCode,
        error: 'Unauthorized, Only Admin can access this end-point',
      });
    }
    
    if (!parseInt(id)) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'ID should be an Integer value',
      });
    }

    try {      
      const { rowCount } = await executor.query(queries.getSingleParty, [id]);
      if (rowCount === 0) {
        return res.status(404).send({
          status: res.statusCode,
          error: 'No party found for provided information',
        });
      }

      await executor.query(queries.deleteParty, [id]);
      return res.status(200).send({
        status: res.statusCode,
        data: [{
          message: 'Party deleted successfuly',
        }],
      });
    } catch (error) {
      return res.status(500).send({
        status: res.statusCode,
        data: error,
      });
    }
  }
}

export default politicalParty;
