export default function makeProfileDb({ pool}){
  return Object.freeze({
    checkUser
  });

  async function checkUser({username}){
    try{
      const query = {
        text: 'SELECT username FROM USERS WHERE username=$1',
        values: Object.values({username})
      }
      const client = await pool.connect();
      const result = await client.query(query);
      if(result.rows.length === 0) return null
      return result.rows[0];
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }

}
