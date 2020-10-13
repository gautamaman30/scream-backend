export default function makeGetProfile({ listProfile }){
  return async function getProfile(httpRequest){
    try{
      if( httpRequest.params.username ){
        const profile = await listProfile({username:  httpRequest.params.username});

        if(profile.error) throw new Error(JSON.stringify(profile.error));
        return {
          headers: {
            'Content-Type': 'application/json'
          },
          statusCode: 200,
          body: {
            profile
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
