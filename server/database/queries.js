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

const userLogin = 'SELECT * FROM user_info WHERE email= $1';
const getUserById = 'SELECT * FROM user_info WHERE id = $1';
const createAccount = `INSERT INTO user_info (firstname, lastname, othername, email, phoneNumber, passportUrl, password, isAdmin, created_at)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                        RETURNING *`;

const registerCandidate = `INSERT INTO candidate_tb (office, party, candidate)
                        VALUES ($1, $2, $3) RETURNING *`;
const makeVote = `INSERT INTO vote_tb (voter, office, candidate, createdOn)
                  VALUES ($1, $2, $3, $4) RETURNING *`;
const voteDecision = 'SELECT * FROM vote_tb WHERE office = $1';


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

  createAccount,
  getUserById,
  userLogin,

  registerCandidate,
  makeVote,
  voteDecision,
};
