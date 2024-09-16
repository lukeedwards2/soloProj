const pg = require('pg');
const Pool = pg.Pool;
const config = {
  database: 'prime_app',  
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

const pool = new Pool(config);

pool.on('connect', () => {
  console.log('Connected to database');
});

pool.on('error', (err) => {
  console.log('Error with database pool', err);
});

module.exports = pool;