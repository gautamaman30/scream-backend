export default function makeUserDb({ pool, hashPassword}){
  return Object.freeze({
    insert,
    findByEmail
  });

  async function insert({...userInfo}){
    try{
      const data = { ...userInfo};
      data.password = await hashPassword(data.password);
      if(data.password === null ) throw new Error("Internal Error");
      const query = {
        text: 'INSERT INTO USERS(id,email,firstname,lastname,dob,createdon,password,username) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',
        values: Object.values(data)
      };
      const client = await pool.connect();
      const result = await client.query(query);
      delete data.password;
      return data;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }

  async function findByEmail( {email} ){
    try{
      const query = {
        text: 'SELECT * FROM USERS WHERE email=$1',
        values: Object.values({email})
      }
      const client = await pool.connect();
      const result = await client.query(query);
      return result.rows.length === 0 ? null: result.rows[0];
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }

}
