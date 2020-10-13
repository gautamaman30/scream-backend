export default function makeDeleteLike({ removeLike }){
  return async function deleteLike(httpRequest){
    try{
      if(!(httpRequest.body.username && httpRequest.params.screamid)) throw new Error('Bad Request')
      const unlikeInfo = {
        screamid: httpRequest.params.screamid,
        username: httpRequest.body.username
      };
      const res = await removeLike(unlikeInfo);
      if(res.error) throw new Error(JSON.stringify(res.error));
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: {
          res
        },
      }
    } catch(e){
      console.log(e);
      return  {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 404,
        body: {
          error: e.message
        }
      }
    }
  }
}
