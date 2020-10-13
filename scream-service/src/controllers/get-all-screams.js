export default function makeGetAllScream({ listAllScreams }){
  return async function getAllScreams(httpRequest){
    try{
      const screams = await listAllScreams();
      if(screams.error) throw new Error(JSON.stringify(screams.error));
      return {
        headers: {
          'Content-Type': 'application/json'
        },
        statusCode: 200,
        body: {
          screams
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
