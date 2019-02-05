const joi = require('joi');
const partyData = require('../data/partySampleData');

class PoliticalParty {
  static createPoliticalPary(req, res) {
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
      logoUrl: joi.string().min(3).max(50).required(),
      representative: joi.string().min(3).max(50).required(),
      contact: joi.string().min(3).max(50).required(),
      website: joi.string().min(3).max(50).required(),
    });

    const validation = joi.validate(req.body, schema, {
      abortEarly: false,
    });

    if (validation.error != null) {
      const errors = [];
      for (let i = 0; i < validation.error.details.length; i++) {
        errors.push(validation.error.details[i].message);
      }
      return res.status(400).send({
        status: res.statusCode,
        error: errors,
      });
    }

    const party = {
      id: partyData.length + 1,
      name,
      hqAddress,
      logoUrl,
      representative,
      contact,
      website,
      created_at: new Date(),
    };

    partyData.push(party);
    return res.status(201).send({
      status: res.statusCode,
      data: [party],
    });
  }

  static getAllPoliticalPary(req, res) {
    return res.status(200).send({
      status: res.statusCode,
      data: partyData,
    });
  }

  static getSinglePoliticalParty(req, res) {
    const { id } = req.params.id;

    if (!Number(id)) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'ID should be an Integer value',
      });
    }

    const record = partyData.filter(item => item.id === Number(id));
    if (record === undefined) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'No information found for provided id',
      });
    }

    return res.status(200).send({
      status: res.statusCode,
      data: record,
    });
  }

  static editPoliticalPary(req, res) {
    const { id } = req.params.id;
    const {
      name,
    } = req.body;

    if (!Number(id)) {
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
        errors.push(validation.error.details[i].message);
      }
      return res.status(400).send({
        status: res.statusCode,
        error: errors,
      });
    }

    const index = partyData.findIndex(item => item.id === Number(id));
    if (index === -1) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'No information found for provided id',
      });
    }

    partyData[index].name = name;
    return res.status(200).send({
      status: res.statusCode,
      data: partyData[index],
    });
  }

  static deletePoliticalPary(req, res) {
    const { id } = req.params.id;

    if (!Number(id)) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'ID should be an Integer value',
      });
    }

    const index = partyData.findIndex(item => item.id === Number(id));
    if (index === -1) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'No information found for provided id',
      });
    }

    partyData.splice(index, 1);
    return res.status(200).send({
      status: res.statusCode,
      data: [{
        message: 'Party deleted successfuly',
      }],
    });
  }
}

module.exports = PoliticalParty;
