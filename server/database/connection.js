const { Pool } = require('pg');
const env = require('dotenv');

env.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('connect', () => console.log('Connected to database'));

const createTables = () => {
  const userTable = `CREATE TABLE IF NOT EXISTS 
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
            token VARCHAR(1023) NOT NULL,
            created_at TIMESTAMP
        )`;

  const partyTable = `CREATE TABLE IF NOT EXISTS 
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

  const officeTable = `CREATE TABLE IF NOT EXISTS
        office_tb (
            id SERIAL NOT NULL PRIMARY KEY,
            type VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            contact VARCHAR(255) NOT NULL,
            created_at TIMESTAMP
        )`;
  const petitionTable = `CREATE TABLE IF NOT EXISTS 
        petition_tb (
            id SERIAL NOT NULL PRIMARY KEY,
            createdBy INT NOT NULL,
            office INT NOT NULL,
            body VARCHAR(511) NOT NULL,
            createdOn TIMESTAMP,
            FOREIGN KEY (createdBy) REFERENCES user_info (id) ON DELETE CASCADE,
            FOREIGN KEY (office) REFERENCES office_tb (id) ON DELETE CASCADE
        )`;

  const voteTable = `CREATE TABLE IF NOT EXISTS 
        vote_tb (
            id SERIAL NOT NULL PRIMARY KEY,
            createdBy INT NOT NULL,
            office INT NOT NULL,
            candidate VARCHAR(255) NOT NULL,
            createdOn TIMESTAMP,
            FOREIGN KEY (createdBy) REFERENCES user_info (id) ON DELETE CASCADE,
            FOREIGN KEY (office) REFERENCES office_tb (id) ON DELETE CASCADE
        )`;

  const candidateTable = ` CREATE TABLE IF NOT EXISTS 
        candidate_tb (
            id SERIAL NOT NULL PRIMARY KEY,
            office INT NOT NULL,
            party INT NOT NULL,
            candidate INT NOT NULL,
            FOREIGN KEY (office) REFERENCES office_tb (id) ON DELETE CASCADE,
            FOREIGN KEY (party) REFERENCES party_tb (id) ON DELETE CASCADE,
            FOREIGN KEY (candidate) REFERENCES user_info (id) ON DELETE CASCADE
        )`;

  pool.query(userTable);
  pool.query(partyTable);
  pool.query(officeTable);
  pool.query(petitionTable);
  pool.query(voteTable);
  pool.query(candidateTable);
  pool.end();
};

const dropTables = () => {
  const dropingTable = `DROP TABLE IF EXISTS 
                        user_info, office, party, petition, vote, candidate`;
  pool.query(dropingTable)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};
pool.on('remove', () => process.exit(0));

module.exports = { createTables, dropTables };

require('make-runnable');
