const { Pool } = require('pg');
const env = require('dotenv');
const moment = require('moment');
const bcrypt= require('bcrypt');

env.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('connect', () => console.log('Connected to database....'));

const createTables = async () => {
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
            id SERIAL NOT NULL PRIMARY KEY,
            createdBy INTEGER NOT NULL,
            office INTEGER NOT NULL,
            body VARCHAR(511) NOT NULL,
            createdOn TIMESTAMP
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
const userData= [
      'Bobo',
      'NIYO',
      'ynwa',
      'admin@gmail.com',
      '0000000000',
      'www.go.rw',
      bcrypt.hashSync('123456',bcrypt.genSaltSync(8)),
      true,
      moment(new Date())];

const seedUserQuery = `INSERT INTO user_info (firstname, lastname, othername, email, phoneNumber, passportUrl, password, isAdmin, created_at)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;

  await pool.query(createUserTableQuery);
  await pool.query(seedUserQuery,userData);
  await pool.query(createPartyTableQuery);
  await pool.query(createOfficeTableQuery);
  await pool.query(createPetitionTableQuery);
  await pool.query(createVoteTableQuery);
  await pool.query(createCandidateTableQuery);
  pool.end();
};

const dropTables = async () => {
  const dropingTable = `DROP TABLE IF EXISTS 
                        user_info, office_tb, party_tb, petition_tb, vote_tb, candidate_tb`;
  await pool.query(dropingTable);
  pool.end();
};
pool.on('remove', () => process.exit(0));

module.exports = { createTables, dropTables };

require('make-runnable');
