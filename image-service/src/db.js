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


const db = Object.freeze({
  updateProfileAvatar: async (data) => {
    try{
      data.lastupdated = Date.now();
      const query = {
        text: 'UPDATE USERS SET avatar=$2,lastupdated=$3 WHERE username=$1',
        values: Object.values(data)
      }
      const client = await pool.connect();
      const result = await client.query(query);
      return result.rowCount;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  },
  updateScreamAvatar: async (data) => {
    try{
      const temp = {username:data.username, avatar: data.avatar};
      const query = {
        text: 'UPDATE SCREAMS SET avatar=$2 WHERE username=$1',
        values: Object.values(temp)
      }
      const client = await pool.connect();
      const result = await client.query(query);
      return result.rowCount;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }
})


export default db;
