import joi from 'joi';
import officeData from '../data/officeSampleData';

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

    const data = {
      id: parseInt(officeData.length + 1),
      type,
      name,
      location,
      contact,
      created_at: new Date(),
    };

    const record = officeData.find(item => item.contact === contact);
    if (record != undefined) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'This office is already registered',
      });
    }


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

    if (!parseInt(id)) {
      return res.status(400).send({
        status: res.statusCode,
        error: 'ID should be an integer',
      });
    }

    const office = officeData.filter(item => item.id === parseInt(id));

    if (office === undefined || office.length === 0) {
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

export default PoliticalOffice;
