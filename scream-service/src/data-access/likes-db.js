export default function makeLikesDb({ pool}){
  return Object.freeze({
    likeScream,
    unlikeScream
  });

  async function likeScream(data){
    try{
      const query = {
        text: 'INSERT INTO LIKES(screamid,username) VALUES($1,$2)',
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

  async function unlikeScream(data){
    try{
      console.log(data);
      const query = {
        text: 'DELETE FROM LIKES WHERE screamid=$1 AND username=$2',
        values: Object.values(data)
      }
      const client = await pool.connect();
      const result = await client.query(query);
      console.log(result);
      return result.rowCount;
    } catch(e){
      console.log(e);
      return {error: e.message};
    }
  }

}
