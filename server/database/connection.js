import { Pool } from 'pg';
import env from 'dotenv';
import moment from 'moment';
import bcrypt from 'bcrypt';
import Helper from './queries';

env.config();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => console.log('Connected to database....'));

const userData = [
    'Bobo',
    'NIYO',
    'ynwa',
    'admin@gmail.com',
    '0000000000',
    'www.go.rw',
    bcrypt.hashSync('123456', bcrypt.genSaltSync(8)),
    true,
    moment(new Date())
];

const initiateTables = async() => {
    await pool.query(Helper.dropingTables);
    await pool.query(Helper.createUserTableQuery);
    await pool.query(Helper.seedUserQuery, userData);
    await pool.query(Helper.createPartyTableQuery);
    await pool.query(Helper.createOfficeTableQuery);
    await pool.query(Helper.createPetitionTableQuery);
    await pool.query(Helper.createVoteTableQuery);
    await pool.query(Helper.createCandidateTableQuery);
};

(async () => {
    await pool.query(initiateTables);
})().catch((error) => {
    console.log(error);
});