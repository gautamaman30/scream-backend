import makeProfileDb from './profile-db.js'
import pg from 'pg'


const pool = new pg.Pool({
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  port: process.env.port,
  host: process.env.host
});

pool.on('error', (err, client) => {
  console.log('Unexpected error on idle client');
  console.log(err);
  process.exit(-1);
});

const profileDb = makeProfileDb({ pool });

export default profileDb;
