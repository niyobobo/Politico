import joi from 'joi';
import uuid from 'uuid';
import moment from 'moment';
import queryExecutor from '../database/queryExecutor';

class PoliticalParty {
  static createPoliticalParty(req, res) {
    const {
      name,
      hqAddress,
      logoUrl,
      representative,
      contact,
      website,
    } = req.body;

    const schema = joi.object().keys({
      name: joi.string().min(3).max(50).required(),
      hqAddress: joi.string().min(3).max(50).required(),
      logoUrl: joi.string().min(3).max(500).required(),
      representative: joi.string().min(3).max(50).required(),
      contact: joi.string().regex(/^(07)(\d{8})/).length(10).required(),
      website: joi.string().min(3).max(50).required(),
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
      uuid(),
      name,
      hqAddress,
      logoUrl,
      representative,
      contact,
      website,
      moment(new Date()),
    ];

    const query = `INSERT INTO party (party_id, name, hqaddress, logourl, representative, contact, website, created_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`;

    try {
      const { rows } = queryExecutor.query(query, party);
      return res.status(201).send({
        status: res.statusCode,
        data: [rows[0]],
      });
    } catch (error) {
      return res.status(400).send({
        status: res.statusCode,
        error: error,
      });
    }
  }
}

export default PoliticalParty;
