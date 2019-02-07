const joi = require('joi');
const officeData = require('../data/officeSampleData');

class PoliticalOffice {
  static createPoliticalOffice(req, res) {
    const {
      type,
      name,
      location,
      contact,
    } = req.body;

    const schema = joi.object().keys({
      type: joi.string().min(3).required(),
      name: joi.string().min(3).required(),
      location: joi.string().min(3).max(50).required(),
      contact: joi.required(),
    });

    const validationError = joi.validate(req.body, schema, {
      abortEarly: false,
    });

    if (validationError.error != null) {
      const errors = [];
      for (let index = 0; index < validationError.error.details.length; index++) {
        errors.push(validationError.error.details[index].message);
      }

      return res.status(400).send({
        status: res.statusCode,
        error: errors,
      });
    }

    const data = {
      id: parseInt(officeData.length + 1),
      type,
      name,
      location,
      contact,
      created_at: new Date(),
    };

    officeData.push(data);
    return res.status(201).send({
      status: res.statusCode,
      data: [data],
    });
  }

  static getAllPoliticalOffices(req, res) {
    return res.status(200).send({
      status: res.statusCode,
      data: officeData,
    });
  }

  static getSpecificPoliticalOffice(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'ID should be an integer',
      });
    }

    const office = officeData.filter(item => item.id === Number(id));

    if (office === undefined) {
      return res.status(404).send({
        status: res.statusCode,
        error: 'No information found for provided id',
      });
    }

    return res.status(200).send({
      status: res.statusCode,
      data: office,
    });
  }
}

module.exports = PoliticalOffice;
