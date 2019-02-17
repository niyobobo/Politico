const { Pool } = require('pg');
const env = require('dotenv');

env.config();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

pool.on('connect', () => console.log('Connected to database'));

const createTables = () => {
  const createUserTable = `CREATE TABLE IF NOT EXISTS 
        user_info (
            user_id SERIAL NOT NULL PRIMARY KEY,
            firstname VARCHAR(255) NOT NULL,
            lastname VARCHAR(255) NOT NULL,
            othername VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phonenumber VARCHAR(255) NOT NULL,
            passporturl VARCHAR(511) NOT NULL,
            isadmin integer NOT NULL,
            password VARCHAR(255) NOT NULL,
            token VARCHAR(1023) NOT NULL,
            created_at TIMESTAMP
        )`;

  const createPartyTable = `CREATE TABLE IF NOT EXISTS 
        party (
            party_id VARCHAR(255) NOT NULL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            hqaddress VARCHAR(255) NOT NULL,
            logourl VARCHAR(511) NOT NULL,
            representative VARCHAR(255) NOT NULL,
            contact VARCHAR(255) NOT NULL,
            website VARCHAR(511) NOT NULL,
            created_at TIMESTAMP
        )`;

  const createOfficeTable = `CREATE TABLE IF NOT EXISTS
        office (
            office_id SERIAL NOT NULL PRIMARY KEY,
            type VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            contact VARCHAR(255) NOT NULL,
            created_at TIMESTAMP
        )`;
  pool.query(createUserTable);
  pool.query(createPartyTable);
  pool.query(createOfficeTable);
  pool.end();
};

const dropTables = () => {
  const dropingTable = 'DROP TABLE IF EXISTS user_Info, office, party';
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
