export default function makeProfileDb({ pool}){
  return Object.freeze({
    updateProfile,
    findByUsername
  });

  async function updateProfile(data){
    try{
      const query = {
        text: 'UPDATE USERS SET username=$2,firstname=$3,lastname=$4,memoir=$5,avatar=$6,lastupdated=$7 WHERE id=$1',
        values: Object.values(data)
      }
      const client = await pool.connect();
      const result = await client.query(query);
      return result.rowCount;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }

  async function findByUsername( data ){
    try{
      const query = {
        text: 'SELECT * FROM USERS WHERE username=$1',
        values: Object.values(data)
      }
      const client = await pool.connect();
      const result = await client.query(query);
      if(result.rows.length === 0) return null
      return result.rows[0];
    } catch(e){
      console.log('helllo');
      console.log(e);
      return {error: e.message};
    }
  }

}
