const joi = require('joi')
const partyData = require('../data/partySampleData')

class PoliticalParty {
    constructor() {}

    static createPoliticalPary(req, res) {

    }

    static getAllPoliticalPary(req, res) {
        return res.status(200).send({
            status: res.statusCode,
            data: partyData
        });
    }

    static getSinglePoliticalPary(req, res) {

    }

    static editPoliticalPary(req, res) {

    }

    static deletePoliticalPary(req, res) {

    }
}

module.exports = PoliticalParty;