const getAllParty = 'SELECT * FROM party';
const checkIfExist = 'SELECT * FROM party WHERE contact = $1';
const getSingleParty = 'SELECT * FROM party WHERE id = $1';
const updateParty = 'UPDATE party SET name = $2 WHERE id = $1 RETURNING *';
const deleteParty = 'DELETE FROM party WHERE id = $1';
const createParty = `INSERT INTO party (name, hqaddress, logourl, representative, contact, website, created_at)
                      VALUES ($1, $2, $3, $4, $5, $6, $7)
                      RETURNING *`;

const getAllOffices = 'SELECT * FROM office';
const getSingleOffice = 'SELECT * FROM office WHERE id = $1';
const checkOfficeExist = 'SELECT * FROM office WHERE contact = $1';
const createOffice = `INSERT INTO office(type, name, location, contact, created_at)
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
