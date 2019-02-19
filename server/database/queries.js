const getAllParty = 'SELECT * FROM party_tb';
const checkIfExist = 'SELECT * FROM party_tb WHERE contact = $1';
const getSingleParty = 'SELECT * FROM party_tb WHERE id = $1';
const updateParty = 'UPDATE party_tb SET name = $2 WHERE id = $1 RETURNING *';
const deleteParty = 'DELETE FROM party_tb WHERE id = $1';
const createParty = `INSERT INTO party_tb (name, hqaddress, logourl, representative, contact, website, created_at)
                      VALUES ($1, $2, $3, $4, $5, $6, $7)
                      RETURNING *`;

const getAllOffices = 'SELECT * FROM office_tb';
const getSingleOffice = 'SELECT * FROM office_tb WHERE id = $1';
const checkOfficeExist = 'SELECT * FROM office_tb WHERE contact = $1';
const createOffice = `INSERT INTO office_tb(type, name, location, contact, created_at)
                      VALUES ($1, $2, $3, $4, $5)
                      RETURNING *`;

export default {
  createParty,
  checkIfExist,
  getSingleParty,
  getAllParty,
  updateParty,
  deleteParty,

  createOffice,
  getAllOffices,
  getSingleOffice,
  checkOfficeExist,
};
