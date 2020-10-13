export default function makeGetUserScreams({ listUserScreams}){
  return async function getUserScreams(httpRequest){
    try{
      if(!(httpRequest.params.username)) throw new Error('Bad Request');
      const {username} = await httpRequest.params;
      const screams= await listUserScreams({username});
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
        statusCode: 400,
        body: {
          error: e.message
        }
      }
    }
  }
}
