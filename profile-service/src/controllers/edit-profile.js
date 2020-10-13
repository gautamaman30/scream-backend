export default function makeEditProfile({ updateProfile }){
  return async function editProfile(httpRequest){
    try{
      const profileInfo = httpRequest.body;
      if(profileInfo.username){
        profileInfo.newUsername =  profileInfo.username;
      }
      profileInfo.username = httpRequest.query.username;
      const profile = await updateProfile(profileInfo);
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
