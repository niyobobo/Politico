import { Pool } from 'pg';
import env from 'dotenv';

env.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default {
  async query(query, params) {
    return await pool.query(query, params)
        .then((res) => res)
        .catch((err) => err);
  },
};
