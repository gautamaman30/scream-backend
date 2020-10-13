import makeUserDb from './user-db.js'
import bcrypt from 'bcryptjs'
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

async function hashPassword(password){
  const saltRounds = 10;
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err){
        console.log(err);
        reject(null);
      }
      resolve(hash);
    })
  });
  return hashedPassword;
}


export async function compareHashPassword(password, hashedPasswod){
  const check = await new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPasswod, (err, isMatch) => {
      if(err){
        console.log(err);
        reject(null);
      }
      if(isMatch) resolve(true);
      else resolve(false);
    });
  });
  return check;
}

const userDb = makeUserDb({ pool , hashPassword});

export default userDb;
