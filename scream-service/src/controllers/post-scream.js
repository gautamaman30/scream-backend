export default function makePostScream({ addScream }){
  return async function postScream(httpRequest){
    try{
      const screamInfo = httpRequest.body;
      const scream = await addScream(screamInfo);
      if(scream.error) throw new Error(JSON.stringify(scream.error));
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 201,
        body: {
          scream
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
