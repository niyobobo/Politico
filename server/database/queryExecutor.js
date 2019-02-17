import { Pool } from 'pg';
import env from 'dotenv';

env.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export default {
  query(query, params) {
    return new Promise((resolve, rejects) => {
      pool.query(query, params)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          console.error('Die');
          rejects(err);
        });
    });
  },
};
