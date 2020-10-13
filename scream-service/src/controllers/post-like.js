export default function makePostLike({ addLike }){
  return async function postLike(httpRequest){
    try{
      if(!(httpRequest.body.username && httpRequest.params.screamid)) throw new Error('Bad Request')
      const likeInfo = {
        screamid: httpRequest.params.screamid,
        username: httpRequest.body.username
      };
      const res = await addLike(likeInfo);
      if(res.error) throw new Error(JSON.stringify(res.error));
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
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
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
