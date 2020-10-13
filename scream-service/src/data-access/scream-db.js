export default function makeScreamDb({ pool}){
  return Object.freeze({
    insert,
    findAllScreams,
    findScreams,
    remove,
    updateLikescount
  });

  async function insert(data){
    try{
      const query = {
        text: 'INSERT INTO SCREAMS(screamid,username,body,avatar,likescount,createdat) VALUES($1,$2,$3,$4,$5,$6)',
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

  async function updateLikescount({screamid, count}){
    try{
      const query = {
        text: `UPDATE SCREAMS SET likescount=likescount+${count} WHERE screamid=$1`,
        values: Object.values({screamid})
      }
      const client = await pool.connect();
      const result = await client.query(query);
      return result.rowCount;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }

  async function findAllScreams(){
    try{
      const query = {
        text: 'SELECT * FROM SCREAMS',
      }
      const client = await pool.connect();
      const result = await client.query(query);
      if(result.rows.length === 0) return null
      return result.rows;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }

  async function findScreams({username}){
    try{
      const query = {
        text: 'SELECT * FROM SCREAMS WHERE username=$1',
        values: Object.values({username})
      }
      const client = await pool.connect();
      const result = await client.query(query);
      if(result.rows.length === 0) return null
      return result.rows;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }

  async function remove({screamid}){
    try{
      const query = {
        text: 'DELETE FROM SCREAMS WHERE screamid=$1',
        values: Object.values({screamid})
      }
      const client = await pool.connect();
      const result = await client.query(query);
      return result.rowCount;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }

}
