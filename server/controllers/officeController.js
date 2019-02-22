import joi from 'joi';
import moment from 'moment';
import queries from '../database/queries';
import queryExecutor from '../database/queryExecutor';

const PoliticalOffice = {
  
  async createPoliticalOffice(req, res) {
    const {
      type,
      name,
      location,
      contact,
    } = req.body;
    const { isAdmin } = req.user;    

    if(!isAdmin){
      return res.status(401).send({
        status: res.statusCode,
        error: 'Unauthorized, Only Admin can access this end-point',
      });
    }
    
    const schema = joi.object().keys({
      type: joi.string().trim().required(),
      name: joi.string().trim().required(),
      location: joi.string().trim().max(50).required(),
      contact: joi.string().regex(/^(07)(\d{8})/).length(10).required(),
    });

    const validationError = joi.validate(req.body, schema, {
      abortEarly: false,
    });

    if (validationError.error != null) {
      const errors = [];
      for (let index = 0; index < validationError.error.details.length; index++) {
        errors.push(validationError.error.details[index].message.split('"').join(''));
      }

      return res.status(400).send({
        status: res.statusCode,
        error: errors,
      });
    }

    const data = [
      type,
      name,
      location,
      contact,
      moment(new Date()),
    ];

    const { rowCount } = await queryExecutor.query(queries.checkOfficeExist, [contact]);
    if (rowCount !== 0) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'This party is already registered',
      });
    }

    try {
      const resulst = await queryExecutor.query(queries.createOffice, data);
      if (resulst.rowCount === 1) {
        return res.status(201).send({
          status: res.statusCode,
          data: resulst.rows,
        });
      }
    } catch (e) {
      console.log(e);
    }
  },

  async getAllPoliticalOffices(req, res) {
    try {
      const { rows } = await queryExecutor.query(queries.getAllOffices);
      return res.status(200).send({
        status: res.statusCode,
        data: rows,       
      });
    } catch (e) {
      return res.status(500).send({
        status: res.statusCode,
        data: err,
      });
    }
  },

  async getSpecificPoliticalOffice(req, res) {
    const { id } = req.params;

    if (!parseInt(id)) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'ID should be an integer',
      });
    }

    try {
      const { rowCount, rows } = await queryExecutor.query(queries.getSingleOffice, [id]);
      if (rowCount === 0) {
        return res.status(404).send({
          status: res.statusCode,
          error: 'No Office found for provided id',
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
  }
}

export default PoliticalOffice;
