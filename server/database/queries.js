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

const userLogin = `SELECT * FROM user_info WHERE email= $1`;
const getUserById = 'SELECT * FROM user_info WHERE id = $1';
const createAccount = `INSERT INTO user_info (firstname, lastname, othername, email, phoneNumber, passportUrl, password, isAdmin, created_at)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                        RETURNING id, firstname, lastname, othername, email, phoneNumber, passportUrl, isAdmin, created_at`;

const registerCandidate = `INSERT INTO candidate_tb (office, party, candidate)
                        VALUES ($1, $2, $3) RETURNING *`;
const makeVote = `INSERT INTO vote_tb (voter, office, candidate, createdOn)
                  VALUES ($1, $2, $3, $4) RETURNING *`;
const voteDecision = `SELECT office,  candidate, CAST(COUNT(*)AS Int) AS result 
                      FROM vote_tb WHERE office = $1 GROUP BY candidate, office`;
const makePetition = `INSERT INTO petition_tb (createdby, office, body, evidence, createdon)
                        VALUES ($1, $2, $3, $4, $5) RETURNING *`;

const createUserTableQuery = `CREATE TABLE IF NOT EXISTS 
                      user_info (
                          id SERIAL NOT NULL PRIMARY KEY,
                          firstname VARCHAR(255) NOT NULL,
                          lastname VARCHAR(255) NOT NULL,
                          othername VARCHAR(255) NOT NULL,
                          email VARCHAR(255) NOT NULL,
                          phoneNumber VARCHAR(255) NOT NULL,
                          passportUrl VARCHAR(511) NOT NULL,
                          isAdmin BOOLEAN NOT NULL,
                          password VARCHAR(255) NOT NULL,
                          created_at TIMESTAMP
                      )`;
              
const createPartyTableQuery = `CREATE TABLE IF NOT EXISTS 
                      party_tb (
                          id SERIAL NOT NULL PRIMARY KEY,
                          name VARCHAR(255) NOT NULL,
                          hqAddress VARCHAR(255) NOT NULL,
                          logoUrl VARCHAR(511) NOT NULL,
                          representative VARCHAR(255) NOT NULL,
                          contact VARCHAR(255) NOT NULL,
                          website VARCHAR(511) NOT NULL,
                          created_at TIMESTAMP
                      )`;
              
const createOfficeTableQuery = `CREATE TABLE IF NOT EXISTS
                      office_tb (
                          id SERIAL NOT NULL PRIMARY KEY,
                          type VARCHAR(255) NOT NULL,
                          name VARCHAR(255) NOT NULL,
                          location VARCHAR(255) NOT NULL,
                          contact VARCHAR(255) NOT NULL,
                          created_at TIMESTAMP
                      )`;
const createPetitionTableQuery = `CREATE TABLE IF NOT EXISTS 
                      petition_tb (
                          id SERIAL NOT NULL,
                          createdBy INTEGER NOT NULL,
                          office INTEGER NOT NULL,
                          body VARCHAR(511) NOT NULL,
                          evidence VARCHAR (1023) NOT NULL,
                          createdOn TIMESTAMP,
                          PRIMARY KEY (createdBy, office)
                      )`;
              
const createVoteTableQuery = `CREATE TABLE IF NOT EXISTS 
                      vote_tb (
                          id SERIAL NOT NULL,
                          voter INTEGER NOT NULL,
                          office INTEGER NOT NULL,
                          candidate INTEGER NOT NULL,
                          createdOn TIMESTAMP,
                          PRIMARY KEY (office, voter)
                      )`;
              
const createCandidateTableQuery = ` CREATE TABLE IF NOT EXISTS 
                      candidate_tb (
                          id SERIAL NOT NULL,
                          office INTEGER NOT NULL,
                          party INTEGER NOT NULL,
                          candidate INTEGER NOT NULL,
                          PRIMARY KEY (candidate, office)
                      )`;

const seedUserQuery = `INSERT INTO user_info (firstname, lastname, othername, email, phoneNumber, passportUrl, password, isAdmin, created_at)
                      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

const dropingTables = `DROP TABLE IF EXISTS 
                      user_info, office_tb, party_tb, petition_tb, vote_tb, candidate_tb`;
  

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
  makePetition,

  createUserTableQuery,
  createPartyTableQuery,
  createOfficeTableQuery,
  createPetitionTableQuery,
  createVoteTableQuery,
  createCandidateTableQuery,
  seedUserQuery,
  dropingTables,
};
