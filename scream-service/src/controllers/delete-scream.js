export default function makeDeleteScream({ removeScream }){
  return async function deleteScream(httpRequest){
    try{
      const {screamid} = httpRequest.params;
      if(screamid){
        const res = await removeScream({screamid});
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
      }
      throw new Error('Bad request');
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
